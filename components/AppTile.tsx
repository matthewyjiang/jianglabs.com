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
} from "@/components/icons";
import type { SVGProps } from "react";

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

/* Richer, deeper gradients designed for full-panel backgrounds.
   Lightness range 0.28–0.52 ensures white text passes WCAG AA at every point. */
const APP_METADATA: Record<string, { action: string; gradient: string; glow: string }> = {
  jellyfin: {
    action: "Watch Movies",
    gradient: "linear-gradient(135deg, oklch(0.48 0.18 280) 0%, oklch(0.28 0.16 295) 100%)",
    glow: "oklch(0.48 0.18 280 / 0.35)",
  },
  jellyseerr: {
    action: "Request Media",
    gradient: "linear-gradient(135deg, oklch(0.50 0.20 335) 0%, oklch(0.30 0.18 350) 100%)",
    glow: "oklch(0.50 0.20 335 / 0.35)",
  },
  navidrome: {
    action: "Listen to Music",
    gradient: "linear-gradient(135deg, oklch(0.52 0.16 50) 0%, oklch(0.35 0.18 25) 100%)",
    glow: "oklch(0.52 0.16 50 / 0.30)",
  },
  immich: {
    action: "View Photos",
    gradient: "linear-gradient(135deg, oklch(0.50 0.15 175) 0%, oklch(0.30 0.14 210) 100%)",
    glow: "oklch(0.50 0.15 175 / 0.35)",
  },
  openwebui: {
    action: "Use AI Chat",
    gradient: "linear-gradient(135deg, oklch(0.50 0.15 145) 0%, oklch(0.30 0.13 170) 100%)",
    glow: "oklch(0.50 0.15 145 / 0.35)",
  },
  hermes: {
    action: "Use AI Assistant",
    gradient: "linear-gradient(135deg, oklch(0.45 0.17 245) 0%, oklch(0.28 0.15 270) 100%)",
    glow: "oklch(0.45 0.17 245 / 0.35)",
  },
  netbird: {
    action: "Manage VPN",
    gradient: "linear-gradient(135deg, oklch(0.45 0.12 155) 0%, oklch(0.28 0.10 180) 100%)",
    glow: "oklch(0.45 0.12 155 / 0.35)",
  },
  gitea: {
    action: "Access Code",
    gradient: "linear-gradient(135deg, oklch(0.50 0.17 55) 0%, oklch(0.33 0.15 30) 100%)",
    glow: "oklch(0.50 0.17 55 / 0.30)",
  },
};

interface AppTileProps {
  app: AppDefinition;
  index: number;
}

export function AppTile({ app, index }: AppTileProps) {
  const AppIcon = ICON_MAP[app.id];
  const meta = APP_METADATA[app.id] ?? {
    action: app.name,
    gradient: "linear-gradient(135deg, oklch(0.45 0.16 285) 0%, oklch(0.28 0.14 300) 100%)",
    glow: "oklch(0.45 0.16 285 / 0.35)",
  };
  const delay = Math.min(index * 40, 200);

  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Launch ${app.name} to ${meta.action.toLowerCase()}`}
      className="app-tile animate-fade-up"
      style={
        {
          "--delay": `${delay}ms`,
          animationDelay: `${delay}ms`,
          "--app-gradient": meta.gradient,
          "--glow-color": meta.glow,
        } as React.CSSProperties
      }
    >
      {/* Subtle top-shine for material depth */}
      <div className="app-tile__shine" aria-hidden="true" />

      {/* Icon */}
      <div className="app-tile__icon">
        {AppIcon ? (
          <AppIcon size={44} />
        ) : (
          <DefaultAppIcon name={app.name} />
        )}
      </div>

      {/* Content */}
      <div className="app-tile__content">
        <span className="app-tile__action">{meta.action}</span>
        <span className="app-tile__service">{app.name}</span>
        <p className="app-tile__description">{app.description}</p>
      </div>

      <style>{`
        .app-tile {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          background: var(--app-gradient);
          border-radius: 16px;
          padding: 28px 24px 24px;
          min-height: 180px;
          overflow: hidden;
          transition:
            transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .app-tile:hover {
          transform: translateY(-4px) scale(1.015);
          box-shadow: 0 16px 40px var(--glow-color);
        }

        .app-tile:active {
          transform: translateY(-1px) scale(0.99);
          transition-duration: 0.1s;
        }

        .app-tile:focus-visible {
          outline: 2px solid oklch(1 0 0 / 0.6);
          outline-offset: 3px;
        }

        /* Material-depth overlay: light at top, darker at bottom */
        .app-tile__shine {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          background: linear-gradient(
            180deg,
            oklch(1 0 0 / 0.07) 0%,
            transparent 45%,
            oklch(0 0 0 / 0.06) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        .app-tile__icon {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .app-tile__icon svg {
          width: 44px;
          height: 44px;
          color: oklch(1 0 0);
          filter: drop-shadow(0 2px 6px oklch(0 0 0 / 0.25));
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .app-tile:hover .app-tile__icon svg {
          transform: scale(1.1);
        }

        .app-tile__content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .app-tile__action {
          font-size: 1.0625rem;
          font-weight: 600;
          color: oklch(1 0 0);
          line-height: 1.3;
          letter-spacing: -0.01em;
        }

        .app-tile__service {
          font-size: 0.75rem;
          font-weight: 500;
          color: oklch(1 0 0 / 0.6);
          line-height: 1.3;
        }

        .app-tile__description {
          font-size: 0.8125rem;
          color: oklch(1 0 0 / 0.55);
          line-height: 1.45;
          margin-top: 8px;
          max-width: 240px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          transition: color 0.2s ease;
        }

        .app-tile:hover .app-tile__description {
          color: oklch(1 0 0 / 0.7);
        }

        .app-tile__default-letter {
          font-size: 2rem;
          font-weight: 700;
          color: oklch(1 0 0);
          text-shadow: 0 2px 4px oklch(0 0 0 / 0.2);
        }

        @media (prefers-reduced-motion: reduce) {
          .app-tile,
          .app-tile__icon svg {
            transition: none !important;
          }
          .app-tile:hover {
            transform: none !important;
            box-shadow: none !important;
          }
          .app-tile:hover .app-tile__icon svg {
            transform: none !important;
          }
          .app-tile:active {
            transform: none !important;
          }
        }
      `}</style>
    </a>
  );
}

function DefaultAppIcon({ name }: { name: string }) {
  const letter = name.charAt(0).toUpperCase();
  return (
    <span className="app-tile__default-letter" aria-hidden="true">
      {letter}
    </span>
  );
}
