# JiangLabs Portal

A private home portal for `jianglabs.com`. Users sign in through Authentik and see the services they are permitted to access, organized by purpose.

## Stack

- **Next.js 16** (App Router, standalone output)
- **Auth.js v5** (NextAuth beta) with a custom Authentik OIDC provider
- **TypeScript**, **Tailwind CSS**
- **Bun** for local package management and scripts
- Deployed behind **Caddy** as a reverse proxy
- Containerized with **Docker**

---

## Project structure

```
jianglabs.com/
├── app/
│   ├── layout.tsx              # fonts, metadata, theme
│   ├── globals.css             # OKLCH design tokens, resets
│   ├── page.tsx                # signed-out hero / landing page
│   ├── home/page.tsx           # signed-in launcher (server component)
│   ├── api/auth/[...nextauth]/ # Auth.js route handler
│   └── auth/error/page.tsx     # graceful auth error page
├── auth.ts                     # Auth.js config — Authentik OIDC
├── middleware.ts               # protect /home, redirect logic
├── config/apps.ts              # app and room definitions
├── lib/
│   ├── authentik.ts            # Authentik API client (user-scoped)
│   └── access.ts               # access resolution (API / groups / hybrid)
├── components/
│   ├── SignInButton.tsx
│   ├── AccountMenu.tsx
│   ├── AppTile.tsx
│   ├── Room.tsx
│   ├── RoomSkeleton.tsx
│   ├── EmptyState.tsx
│   └── icons/index.tsx         # inline SVG app and UI icons
├── Dockerfile
├── docker-compose.yml
├── Caddyfile
└── .env.example
```

---

## Local development

```bash
cp .env.example .env.local
# Fill in AUTH_SECRET, AUTHENTIK_*, etc.
bun install
bun dev
```

The site runs at `http://localhost:3000`.

Useful commands:

```bash
bun run lint
bun run build
bun start
```

---

## Environment variables

Copy `.env.example` to `.env` (production) or `.env.local` (dev) and fill in all values.

| Variable | Required | Description |
|---|---|---|
| `AUTH_SECRET` | Yes | Random secret for cookie encryption. Generate: `openssl rand -base64 32` |
| `AUTH_URL` | Yes | Public Auth.js base path. For default routing use `https://jianglabs.com/api/auth` |
| `AUTH_TRUST_HOST` | Yes, behind proxy | Set `true` behind Caddy/nginx/Traefik/Cloudflare so Auth.js trusts forwarded host/proto headers |
| `AUTHENTIK_URL` | Yes | Base URL of your Authentik instance: `https://auth.jianglabs.com` |
| `AUTHENTIK_ISSUER` | Yes | OIDC issuer: `https://auth.jianglabs.com/application/o/<slug>/` — must exactly match Authentik discovery metadata, including trailing slash |
| `AUTHENTIK_CLIENT_ID` | Yes | OAuth2 client ID from Authentik provider settings |
| `AUTHENTIK_CLIENT_SECRET` | Yes | OAuth2 client secret — never commit this |
| `AUTHENTIK_APPLICATION_SLUG` | No | Application slug for deep-links (default: `jianglabs-portal`) |
| `ACCESS_MODE` | No | `hybrid` (default), `authentik-api`, or `groups` — see below |

---

## Authentik OIDC setup

### 1. Create an OAuth2/OIDC provider

In Authentik: **Applications > Providers > Create > OAuth2/OpenID Provider**.

| Field | Value |
|---|---|
| Name | `JiangLabs Portal` |
| Client type | Confidential |
| Client ID | (copy to `AUTHENTIK_CLIENT_ID`) |
| Client secret | (copy to `AUTHENTIK_CLIENT_SECRET`) |
| Redirect URI | `https://jianglabs.com/api/auth/callback/authentik` |
| Signing key | Select any (or create one) |

Also set `AUTH_TRUST_HOST=true` in deployment env when running behind a reverse proxy.

**Scopes** — select all of these scope mappings on the provider:

- `openid`
- `profile` (includes `preferred_username` and `groups` claim)
- `email`
- `offline_access` (required for refresh token — needed by `goauthentik.io/api`)
- `goauthentik.io/api` (grants API access on behalf of the user — required for `authentik-api` and `hybrid` modes)

### 2. Create the application

**Applications > Create**.

| Field | Value |
|---|---|
| Name | `JiangLabs Portal` |
| Slug | `jianglabs-portal` (or your chosen slug — must match `AUTHENTIK_ISSUER` and `AUTHENTIK_APPLICATION_SLUG`) |
| Provider | the provider you just created |
| Launch URL | `https://jianglabs.com` |

### 3. Set the issuer env var

The issuer format is: `https://<authentik-host>/application/o/<slug>/`

Example: `AUTHENTIK_ISSUER=https://auth.jianglabs.com/application/o/jianglabs-portal/`

**Include trailing slash.** Auth.js compares this against Authentik discovery metadata exactly; mismatch triggers `Configuration` error during sign-in.

### 4. Access policies

Bind access policies to the application as needed. Users who fail the policy will not be able to sign in at all. Users who pass will be authenticated and then filtered by room/app according to `ACCESS_MODE`.

> **Slug caveat:** do not use the reserved slugs `authorize`, `token`, `device`, `userinfo`, `introspect`, or `revoke` — these conflict with Authentik's global OAuth2 endpoints.

---

## Access modes and group mapping

### How it works

The portal resolves which apps each user sees using one of three modes, set by `ACCESS_MODE`:

#### `authentik-api` (most accurate)

Calls `GET /api/v3/core/applications/` on your Authentik instance using the signed-in user's access token. Authentik runs its own policy-based check and returns only the applications that user is allowed to launch. The portal matches the returned application slugs against `config/apps.ts`.

- Requires `goauthentik.io/api` and `offline_access` scopes on the provider.
- If the API call fails (misconfigured scope, network error), shows a clear error message.

#### `groups` (config-based, no API)

Reads the `groups` claim from the user's OIDC token (included in the `profile` scope) and filters `config/apps.ts` by the `allowedGroups` field on each app definition.

- No Authentik API call required.
- Accuracy is limited to group membership; ignores Authentik expression policies.

#### `hybrid` (default, recommended)

Tries `authentik-api` first; falls back to `groups` if the API is unavailable. Logs a server-side warning on fallback. The dashboard never shows a blank page due to a misconfigured scope.

### Editing the group mapping

Open `config/apps.ts` and edit `allowedGroups` on each app. Group names must match exactly what Authentik puts in the `groups` claim:

```ts
{
  id: "jellyfin",
  authentikSlug: "jellyfin",   // must match the Authentik application slug
  allowedGroups: ["media", "admin"],
  // ...
}
```

Typical groups:

| Group | Sees |
|---|---|
| `admin` | All apps |
| `media` | Jellyfin, Jellyseerr, Navidrome, Immich |
| `photos` | Immich |
| `ai` | OpenWebUI, Hermes |
| `network` | NetBird |
| `dev` | Gitea |

Create these groups in Authentik (**Directory > Groups**) and add users to them.

### Matching Authentik slugs

Each app in `config/apps.ts` has an `authentikSlug` field. This must match the **slug** of the corresponding application in Authentik (visible in **Applications > [app name] > Settings**). The portal uses these slugs to match the API response.

---

## Docker deployment

### Build and run

```bash
# Build the image
docker build -t jianglabs-portal .

# Run with an env file
docker run -d \
  --name jianglabs-portal \
  --env-file .env \
  -p 3000:3000 \
  jianglabs-portal
```

### Docker Compose

```bash
# Create the shared network (once)
docker network create web

# Copy and fill in env file
cp .env.example .env
# edit .env

# Start
docker compose up -d
```

---

## Caddy reverse proxy

The `Caddyfile` in this repo handles:
- `www.jianglabs.com` → permanent 308 redirect to `https://jianglabs.com`
- `jianglabs.com` → reverse proxy to the portal container at `portal:3000`
- Security headers (HSTS, CSP, X-Frame-Options, etc.)

If Caddy runs on the host (not in Docker Compose), replace `portal:3000` with `localhost:3000` or the container's IP.

```
www.jianglabs.com {
    redir https://jianglabs.com{uri} permanent
}

jianglabs.com {
    reverse_proxy portal:3000
}
```

DNS: point both `jianglabs.com` and `www.jianglabs.com` A records at your server IP.

---

## Logout

Clicking **Sign out** in the account menu:
1. Clears the Auth.js session cookie.
2. Redirects to `/` (signed-out landing page).

Auth.js v5 automatically hits the Authentik `end_session_endpoint` (from OIDC discovery) if the `id_token` is available in the session, which logs the user out of Authentik too (single sign-out).

---

## Security notes

- `AUTH_SECRET` and `AUTHENTIK_CLIENT_SECRET` are server-only; never exposed to the browser.
- App filtering is done server-side in React Server Components. Unauthorized app URLs are never sent to the browser.
- Session is an encrypted JWE cookie (`httpOnly`, `Secure`, `SameSite=Lax`).
- The portal is marked `robots: noindex` so search engines do not index it.
- Tighten the CSP in `Caddyfile` as needed for your setup.
