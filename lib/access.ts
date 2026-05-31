/**
 * Access resolution — decides which configured apps a user may see.
 *
 * ACCESS_MODE (env var):
 *   "authentik-api"  — query Authentik /core/applications/ with user token.
 *                      On failure: show an explicit error, do not fall back.
 *   "groups"         — filter config/apps.ts by the OIDC "groups" claim only.
 *                      No Authentik API call.
 *   "hybrid"         — (default) try API; on failure log a warning and fall
 *                      back to group config so the dashboard never goes blank.
 */

import { APPS, type AppDefinition } from "@/config/apps";
import { fetchUserApps } from "@/lib/authentik";

export type AccessMode = "authentik-api" | "groups" | "hybrid";

export interface AccessResult {
  apps: AppDefinition[];
  /** null = success; string = human-readable error to surface in the UI */
  error: string | null;
  /** true if result came from the API, false if from group-config fallback */
  fromApi: boolean;
}

function resolveMode(): AccessMode {
  const raw = (process.env.ACCESS_MODE ?? "hybrid").toLowerCase();
  if (raw === "authentik-api" || raw === "groups" || raw === "hybrid") {
    return raw as AccessMode;
  }
  console.warn(
    `[access] Unknown ACCESS_MODE="${raw}", defaulting to "hybrid".`
  );
  return "hybrid";
}

/** Filter APPS by the user's Authentik group membership (OIDC claim). */
function filterByGroups(groups: string[]): AppDefinition[] {
  const groupSet = new Set(groups.map((g) => g.toLowerCase()));
  return APPS.filter((app) =>
    app.allowedGroups.some((g) => groupSet.has(g.toLowerCase()))
  );
}

/** Filter APPS by the slugs returned from the Authentik API. */
function filterBySlugs(slugs: Set<string>): AppDefinition[] {
  return APPS.filter((app) => slugs.has(app.authentikSlug));
}

/**
 * Main entry point. Call from a React Server Component.
 *
 * @param accessToken  The user's Authentik access token (from session).
 * @param userId       Stable user identifier for cache keying.
 * @param groups       The "groups" claim from the OIDC token (may be empty).
 */
export async function resolveApps(
  accessToken: string | undefined,
  userId: string,
  groups: string[]
): Promise<AccessResult> {
  const mode = resolveMode();

  if (mode === "groups") {
    return {
      apps: filterByGroups(groups),
      error: null,
      fromApi: false,
    };
  }

  // "authentik-api" or "hybrid" — attempt the API call
  if (!accessToken) {
    const msg =
      "No access token in session. The provider may be missing the " +
      "'offline_access' or 'goauthentik.io/api' scope.";
    if (mode === "authentik-api") {
      return { apps: [], error: msg, fromApi: false };
    }
    console.warn(`[access] hybrid fallback (no token): ${msg}`);
    return { apps: filterByGroups(groups), error: null, fromApi: false };
  }

  const apiApps = await fetchUserApps(accessToken, userId);

  if (apiApps !== null) {
    const slugs = new Set(apiApps.map((a) => a.slug));
    return {
      apps: filterBySlugs(slugs),
      error: null,
      fromApi: true,
    };
  }

  // API returned null (error / scope misconfigured / network)
  if (mode === "authentik-api") {
    return {
      apps: [],
      error:
        "Could not load your service list from Authentik. " +
        "If you are the admin, ensure the portal provider has the " +
        "'goauthentik.io/api' and 'offline_access' scope mappings enabled.",
      fromApi: false,
    };
  }

  // hybrid: fall back to group config with a server-side warning
  console.warn(
    "[access] hybrid: Authentik API unavailable — falling back to group-config filtering. " +
      "Check AUTHENTIK_URL and the provider's scope mappings."
  );
  return {
    apps: filterByGroups(groups),
    error: null,
    fromApi: false,
  };
}
