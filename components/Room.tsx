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
      style={{
        background: `var(--tint-${room.id})`,
        borderRadius: "16px",
        padding: "28px 24px",
      }}
    >
      {/* Room label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "20px",
        }}
      >
        {RoomIcon && (
          <RoomIcon style={{ color: "var(--ink-muted)", flexShrink: 0 }} />
        )}
        <h2
          id={`room-${room.id}`}
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            color: "var(--ink-muted)",
            letterSpacing: "0.01em",
          }}
        >
          {room.label}
        </h2>
      </div>

      {/* Tile grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "12px",
        }}
      >
        {apps.map((app, i) => (
          <AppTile key={app.id} app={app} index={i} />
        ))}
      </div>
    </section>
  );
}
