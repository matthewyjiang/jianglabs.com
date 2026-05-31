/**
 * Authentik API client — server-side only.
 *
 * Calls GET /api/v3/core/applications/ using the user's own access token
 * (obtained via the goauthentik.io/api OIDC scope). That endpoint runs
 * Authentik's policy-based access check and returns only the apps the
 * authenticated user is permitted to launch.
 *
 * Results are cached in-process for CACHE_TTL_MS per (user PK, token prefix)
 * to avoid hammering Authentik on every dashboard render.
 */

const AUTHENTIK_URL = process.env.AUTHENTIK_URL ?? "";
const CACHE_TTL_MS = 30_000; // 30 s

/** Minimal shape of an Authentik application object */
export interface AuthentikApplication {
  pk: string;
  name: string;
  slug: string;
  launch_url: string | null;
  meta_description: string;
  meta_icon: string | null;
  group: string;
}

interface AuthentikListResponse {
  count: number;
  results: AuthentikApplication[];
}

interface CacheEntry {
  apps: AuthentikApplication[];
  fetchedAt: number;
}

// Simple in-process cache: key → entry
const cache = new Map<string, CacheEntry>();

function cacheKey(userId: string, tokenPrefix: string): string {
  return `${userId}::${tokenPrefix}`;
}

function isExpired(entry: CacheEntry): boolean {
  return Date.now() - entry.fetchedAt > CACHE_TTL_MS;
}

/**
 * Fetch the list of applications this user is allowed to access.
 * Returns null on any error (caller decides how to handle).
 */
export async function fetchUserApps(
  accessToken: string,
  userId: string
): Promise<AuthentikApplication[] | null> {
  if (!AUTHENTIK_URL) {
    console.error(
      "[authentik] AUTHENTIK_URL is not set. Cannot query application access."
    );
    return null;
  }

  const tokenPrefix = accessToken.slice(0, 8);
  const key = cacheKey(userId, tokenPrefix);

  const cached = cache.get(key);
  if (cached && !isExpired(cached)) {
    return cached.apps;
  }

  const url = `${AUTHENTIK_URL}/api/v3/core/applications/?ordering=name`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5_000);

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      signal: controller.signal,
      // Next.js cache: no-store — always fresh, filtered per user
      cache: "no-store",
    });

    clearTimeout(timeout);

    if (res.status === 401 || res.status === 403) {
      console.warn(
        `[authentik] Access token rejected by Authentik API (${res.status}). ` +
          "Ensure the provider has the 'goauthentik.io/api' scope mapping enabled."
      );
      return null;
    }

    if (!res.ok) {
      console.warn(
        `[authentik] Unexpected response from Authentik API: ${res.status} ${res.statusText}`
      );
      return null;
    }

    const data: AuthentikListResponse = await res.json();
    const apps = data.results ?? [];

    cache.set(key, { apps, fetchedAt: Date.now() });

    // Evict stale entries occasionally
    if (cache.size > 200) {
      for (const [k, v] of cache.entries()) {
        if (isExpired(v)) cache.delete(k);
      }
    }

    return apps;
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      console.warn("[authentik] Authentik API request timed out after 5s.");
    } else {
      console.warn("[authentik] Failed to reach Authentik API:", err);
    }
    return null;
  }
}
