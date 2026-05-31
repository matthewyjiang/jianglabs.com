import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { resolveApps } from "@/lib/access";
import { ROOMS } from "@/config/apps";
import { Room } from "@/components/Room";
import { EmptyState } from "@/components/EmptyState";
import { AccountMenu } from "@/components/AccountMenu";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/home");
  }

  const user = session.user;
  const groups = user.groups ?? [];
  const accessToken = session.accessToken;
  const userId = user.sub ?? user.email ?? "unknown";

  // Resolve visible apps server-side — URLs never reach the browser for unauthorized apps
  const { apps: visibleApps, error } = await resolveApps(
    accessToken,
    userId,
    groups
  );

  // Group visible apps by room
  const appsByRoom = ROOMS.map((room) => ({
    room,
    apps: visibleApps.filter((a) => a.category === room.id),
  })).filter(({ apps }) => apps.length > 0);

  const authentikUrl = process.env.AUTHENTIK_URL ?? "";

  // Greeting based on time-of-day
  const firstName = user.name?.split(" ")[0] ?? user.username ?? "there";

  return (
    <>
      <div className="dash-root">
        {/* ── Top bar ──────────────────────────────────────────── */}
        <header className="topbar" role="banner">
          <Link href="/" className="topbar-wordmark" aria-label="Jiang Labs home">
            Jiang Labs
          </Link>

          <AccountMenu
            name={user.name}
            username={user.username ?? null}
            email={user.email}
            authentikUrl={authentikUrl}
          />
        </header>

        {/* ── Main content ──────────────────────────────────────── */}
        <main className="dash-main" id="main-content">
          {/* Greeting */}
          <div className="dash-greeting animate-fade-up">
            <h1 className="greeting-heading">
              Hello, {firstName}.
            </h1>
            {appsByRoom.length > 0 && (
              <p className="greeting-sub">
                {visibleApps.length} service{visibleApps.length !== 1 ? "s" : ""} available to you.
              </p>
            )}
          </div>

          {/* Rooms or empty/error state */}
          {error ? (
            <EmptyState error={error} />
          ) : appsByRoom.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="rooms-list">
              {appsByRoom.map(({ room, apps }, i) => (
                <div
                  key={room.id}
                  className="animate-fade-up"
                  style={
                    {
                      "--delay": `${40 + i * 60}ms`,
                      animationDelay: `${40 + i * 60}ms`,
                    } as React.CSSProperties
                  }
                >
                  <Room room={room} apps={apps} />
                </div>
              ))}
            </div>
          )}
        </main>

        {/* ── Footer ───────────────────────────────────────────── */}
        <footer className="dash-footer">
          <p>Jiang Labs</p>
        </footer>
      </div>

      <style>{`
        .dash-root {
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
        }

        /* ── Top bar ── */
        .topbar {
          position: sticky;
          top: 0;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          background: oklch(0.17 0.016 280 / 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          z-index: var(--z-sticky);
        }

        .topbar-wordmark {
          font-size: 1rem;
          font-weight: 700;
          color: var(--ink);
          letter-spacing: -0.01em;
          text-decoration: none;
          transition: color 150ms ease-out;
        }
        .topbar-wordmark:hover { color: var(--primary); }

        /* ── Main ── */
        .dash-main {
          flex: 1;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 24px 64px;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        /* ── Greeting ── */
        .dash-greeting {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .greeting-heading {
          font-size: 1.75rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--ink);
        }

        .greeting-sub {
          font-size: 0.875rem;
          color: var(--ink-muted);
          max-width: none;
        }

        /* ── Rooms ── */
        .rooms-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* ── Footer ── */
        .dash-footer {
          text-align: center;
          padding: 24px;
          font-size: 0.75rem;
          color: var(--ink-faint);
          border-top: 1px solid var(--border);
        }

        /* Hide account name on small screens */
        @media (max-width: 480px) {
          .hide-on-mobile { display: none !important; }
          .dash-main { padding: 24px 16px 48px; }
          .topbar { padding: 0 16px; }
        }
      `}</style>
    </>
  );
}
