export function RoomSkeleton() {
  return (
    <div
      aria-hidden="true"
      style={{
        borderRadius: "16px",
        padding: "28px 24px",
        background: "var(--surface)",
      }}
    >
      {/* Room label skeleton */}
      <div
        className="skeleton"
        style={{
          width: "80px",
          height: "16px",
          borderRadius: "4px",
          marginBottom: "20px",
        }}
      />

      {/* Tile skeletons */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "12px",
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="skeleton"
            style={{
              height: "120px",
              borderRadius: "12px",
              animationDelay: `${i * 100}ms`,
            }}
          />
        ))}
      </div>

      <style>{`
        .skeleton {
          background: linear-gradient(
            90deg,
            var(--surface) 25%,
            var(--surface-raised) 50%,
            var(--surface) 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite ease-in-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .skeleton {
            animation: none;
            background: var(--surface);
          }
        }
      `}</style>
    </div>
  );
}
