interface EmptyStateProps {
  /** API/access error message — show a different message vs. simply no apps assigned */
  error?: string | null;
}

export function EmptyState({ error }: EmptyStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "64px 24px",
        gap: "16px",
        maxWidth: "480px",
        margin: "0 auto",
      }}
    >
      {error ? (
        <>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "oklch(0.65 0.20 25 / 0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.25rem",
            }}
            aria-hidden="true"
          >
            ⚠
          </div>
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "var(--ink)",
            }}
          >
            Could not load your services
          </h2>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--ink-muted)",
              lineHeight: 1.6,
            }}
          >
            {error}
          </p>
        </>
      ) : (
        <>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "var(--primary-muted)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-hidden="true"
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="3"
                y="3"
                width="7"
                height="7"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.5"
                style={{ color: "var(--primary)" }}
              />
              <rect
                x="14"
                y="3"
                width="7"
                height="7"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.5"
                style={{ color: "var(--primary)" }}
              />
              <rect
                x="3"
                y="14"
                width="7"
                height="7"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.5"
                style={{ color: "var(--primary)" }}
              />
              <rect
                x="14"
                y="14"
                width="7"
                height="7"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.5"
                style={{ color: "var(--primary)" }}
              />
            </svg>
          </div>
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "var(--ink)",
            }}
          >
            Nothing here yet
          </h2>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--ink-muted)",
              lineHeight: 1.6,
            }}
          >
            Your account does not have access yet. Ask an admin to add you,
            then refresh this page.
          </p>
        </>
      )}
    </div>
  );
}
