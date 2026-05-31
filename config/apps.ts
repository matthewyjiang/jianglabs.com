/**
 * App and room definitions for the Jiang Labs portal.
 *
 * Each app entry:
 *   - authentikSlug: the application slug in Authentik (used to match the
 *     API response from GET /api/v3/core/applications/). Must match exactly.
 *   - allowedGroups: fallback group names used when ACCESS_MODE is "groups"
 *     or when the Authentik API is unavailable in "hybrid" mode. Group names
 *     must match exactly what Authentik puts in the "groups" OIDC claim.
 *
 * Room categories map to the visual sections on the dashboard.
 */

export type AppCategory =
  | "watch"
  | "listen"
  | "photos"
  | "ai"
  | "network"
  | "develop";

export interface AppDefinition {
  /** Unique identifier for the app within this config */
  id: string;
  /** Application slug in Authentik — must match the slug field in /core/applications/ */
  authentikSlug: string;
  /** Display name */
  name: string;
  /** Short user-facing description (≤ 80 chars, no jargon) */
  description: string;
  /** Full URL to the app */
  url: string;
  /** Room/category this app belongs to */
  category: AppCategory;
  /** Groups (from Authentik OIDC "groups" claim) allowed to see this app.
   *  Used as fallback when ACCESS_MODE=groups or API unavailable in hybrid mode.
   *  "admin" group typically sees everything; add group names that match Authentik. */
  allowedGroups: string[];
}

export interface RoomDefinition {
  id: AppCategory;
  /** Friendly display label */
  label: string;
  /** One-word label for aria and small screens */
  shortLabel: string;
}

export const ROOMS: RoomDefinition[] = [
  { id: "watch", label: "Watch", shortLabel: "Watch" },
  { id: "listen", label: "Listen", shortLabel: "Listen" },
  { id: "photos", label: "Photos", shortLabel: "Photos" },
  { id: "ai", label: "AI", shortLabel: "AI" },
  { id: "network", label: "Network", shortLabel: "Network" },
  { id: "develop", label: "Develop", shortLabel: "Dev" },
];

export const APPS: AppDefinition[] = [
  {
    id: "jellyfin",
    authentikSlug: "jellyfin",
    name: "Jellyfin",
    description: "Stream movies and TV shows from your personal library.",
    url: "https://jellyfin.jianglabs.com",
    category: "watch",
    allowedGroups: ["media", "admin"],
  },
  {
    id: "jellyseerr",
    authentikSlug: "jellyseerr",
    name: "Jellyseerr",
    description: "Request new movies and shows to add to the library.",
    url: "https://seerr.jianglabs.com",
    category: "watch",
    allowedGroups: ["media", "admin"],
  },
  {
    id: "navidrome",
    authentikSlug: "navidrome",
    name: "Navidrome",
    description: "Listen to your personal music collection, anywhere.",
    url: "https://music.jianglabs.com",
    category: "listen",
    allowedGroups: ["media", "admin"],
  },
  {
    id: "immich",
    authentikSlug: "immich",
    name: "Immich",
    description: "Browse and share photos and videos from the family album.",
    url: "https://immich.jianglabs.com",
    category: "photos",
    allowedGroups: ["photos", "media", "admin"],
  },
  {
    id: "openwebui",
    authentikSlug: "open-web-ui",
    name: "Open WebUI",
    description: "Chat with local AI models, privately on your own server.",
    url: "https://webui.jianglabs.com",
    category: "ai",
    allowedGroups: ["ai", "admin"],
  },
  {
    id: "hermes",
    authentikSlug: "hermes-web-ui",
    name: "Hermes",
    description: "AI-powered messaging and workflow assistant.",
    url: "https://hermes.jianglabs.com",
    category: "ai",
    allowedGroups: ["ai", "admin"],
  },
  {
    id: "netbird",
    authentikSlug: "netbird",
    name: "NetBird",
    description: "Manage secure network connections and remote access.",
    url: "https://netbird.jianglabs.com",
    category: "network",
    allowedGroups: ["network", "admin"],
  },
  {
    id: "gitea",
    authentikSlug: "gitea",
    name: "Gitea",
    description: "Browse and manage code repositories.",
    url: "https://git.jianglabs.com",
    category: "develop",
    allowedGroups: ["dev", "admin"],
  },
];
