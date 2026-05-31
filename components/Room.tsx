import type { AppCategory, AppDefinition, RoomDefinition } from "@/config/apps";
import { AppTile } from "@/components/AppTile";
import {
  WatchRoomIcon,
  ListenRoomIcon,
  PhotosRoomIcon,
  AIRoomIcon,
  NetworkRoomIcon,
  DevelopRoomIcon,
} from "@/components/icons";
import type { SVGProps } from "react";

const ROOM_ICONS: Record<AppCategory, React.ComponentType<SVGProps<SVGSVGElement>>> = {
  watch:   WatchRoomIcon,
  listen:  ListenRoomIcon,
  photos:  PhotosRoomIcon,
  ai:      AIRoomIcon,
  network: NetworkRoomIcon,
  develop: DevelopRoomIcon,
};

interface RoomProps {
  room: RoomDefinition;
  apps: AppDefinition[];
}

export function Room({ room, apps }: RoomProps) {
  if (apps.length === 0) return null;

  const RoomIcon = ROOM_ICONS[room.id];

  return (
    <section
      aria-labelledby={`room-${room.id}`}
      className="room-section"
    >
      {/* Room label header */}
      <div className="room-header">
        {RoomIcon && (
          <RoomIcon className="room-header__icon" style={{ width: 16, height: 16 }} />
        )}
        <h2 id={`room-${room.id}`} className="room-header__title">
          {room.label}
        </h2>
      </div>

      {/* Grid of launchpad icons */}
      <div className="room-grid">
        {apps.map((app, i) => (
          <AppTile key={app.id} app={app} index={i} />
        ))}
      </div>

      <style>{`
        .room-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
        }

        .room-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-left: 2px;
        }

        .room-header__icon {
          color: var(--ink-muted);
          opacity: 0.6;
          flex-shrink: 0;
        }

        .room-header__title {
          font-size: 0.75rem;
          font-weight: 600;
          color: oklch(0.50 0.01 280);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .room-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        @media (max-width: 640px) {
          .room-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
}
