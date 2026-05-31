import type { AppDefinition } from "@/config/apps";
import {
  JellyfinIcon,
  JellyseerrIcon,
  NavidromeIcon,
  ImmichIcon,
  OpenWebUIIcon,
  HermesIcon,
  NetBirdIcon,
  GiteaIcon,
  ExternalLinkIcon,
} from "@/components/icons";
import type { SVGProps } from "react";

const CATEGORY_LABELS: Record<string, string> = {
  watch:   "Watch",
  listen:  "Listen",
  photos:  "Photos",
  ai:      "AI",
  network: "Network",
  develop: "Dev",
};

const ICON_MAP: Record<string, React.ComponentType<SVGProps<SVGSVGElement> & { size?: number }>> = {
  jellyfin:   JellyfinIcon,
  jellyseerr: JellyseerrIcon,
  navidrome:  NavidromeIcon,
  immich:     ImmichIcon,
  openwebui:  OpenWebUIIcon,
  hermes:     HermesIcon,
  netbird:    NetBirdIcon,
  gitea:      GiteaIcon,
};

interface AppTileProps {
  app: AppDefinition;
  /** Index within its room — used for stagger delay */
  index: number;
}

export function AppTile({ app, index }: AppTileProps) {
  const AppIcon = ICON_MAP[app.id];
  const categoryLabel = CATEGORY_LABELS[app.category] ?? app.category;
  const delay = Math.min(index * 40, 200);

  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${app.name} — ${app.description}`}
      className="app-tile animate-fade-up"
      style={
        {
          "--delay": `${delay}ms`,
          animationDelay: `${delay}ms`,
        } as React.CSSProperties
      }
    >
      {/* Icon */}
      <div className="app-tile__icon">
        {AppIcon ? (
          <AppIcon size={28} style={{ color: "var(--ink-muted)" }} />
        ) : (
          <DefaultAppIcon name={app.name} />
        )}
      </div>

      {/* Content */}
      <div className="app-tile__content">
        <div className="app-tile__header">
          <span className="app-tile__name">{app.name}</span>
          <ExternalLinkIcon className="app-tile__external" />
        </div>
        <p className="app-tile__description">{app.description}</p>
        <span className="app-tile__pill">{categoryLabel}</span>
      </div>

      <style>{`
        .app-tile {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 20px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          text-decoration: none;
          color: inherit;
          transition:
            background-color 160ms ease-out,
            border-color 160ms ease-out,
            transform 160ms ease-out,
            box-shadow 160ms ease-out;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .app-tile:hover {
          background: var(--surface-raised);
          border-color: oklch(0.62 0.10 285 / 0.4);
          transform: translateY(-2px);
          box-shadow: 0 4px 20px oklch(0 0 0 / 0.3);
        }

        .app-tile:hover .app-tile__icon svg {
          color: var(--primary) !important;
          transition: color 160ms ease-out;
        }

        .app-tile:focus-visible {
          outline: 2px solid var(--primary);
          outline-offset: 2px;
        }

        .app-tile__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 10px;
          background: oklch(0.62 0.08 285 / 0.12);
          flex-shrink: 0;
        }

        .app-tile__content {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }

        .app-tile__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .app-tile__name {
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--ink);
          line-height: 1.3;
        }

        .app-tile__external {
          color: var(--ink-faint);
          flex-shrink: 0;
          opacity: 0;
          transition: opacity 160ms ease-out;
        }

        .app-tile:hover .app-tile__external {
          opacity: 1;
          color: var(--primary);
        }

        .app-tile__description {
          font-size: 0.8125rem;
          color: var(--ink-muted);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          max-width: none;
        }

        .app-tile__pill {
          display: inline-flex;
          align-items: center;
          font-size: 0.6875rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          background: var(--primary-muted);
          color: var(--primary);
          border-radius: 4px;
          padding: 2px 6px;
          align-self: flex-start;
          margin-top: auto;
        }

        @media (prefers-reduced-motion: reduce) {
          .app-tile {
            transition: background-color 160ms ease-out, border-color 160ms ease-out;
          }
          .app-tile:hover {
            transform: none;
          }
        }
      `}</style>
    </a>
  );
}

function DefaultAppIcon({ name }: { name: string }) {
  const letter = name.charAt(0).toUpperCase();
  return (
    <span
      style={{
        fontSize: "1.125rem",
        fontWeight: 700,
        color: "var(--primary)",
        lineHeight: 1,
      }}
      aria-hidden="true"
    >
      {letter}
    </span>
  );
}
