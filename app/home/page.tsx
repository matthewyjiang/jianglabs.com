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

  // Greeting based on username
  const firstName = user.name?.split(" ")[0] ?? user.username ?? "there";

  // Time-based greeting
  const hour = new Date().getHours();
  const timeGreeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <>
      <div className="dash-root">
        {/* Subtle ambient gradient */}
        <div className="dash-ambient" aria-hidden="true" />

        {/* ── Top bar ── */}
        <header className="topbar" role="banner">
          <Link href="/" className="topbar-wordmark" aria-label="JiangLabs home">
            <span className="topbar-monogram" aria-hidden="true">J</span>
            <span className="topbar-name">JiangLabs</span>
          </Link>

          <AccountMenu
            name={user.name}
            username={user.username ?? null}
            email={user.email}
            authentikUrl={authentikUrl}
          />
        </header>

        {/* ── Main content ── */}
        <main className="dash-main" id="main-content">
          {/* Greeting */}
          <div className="dash-greeting animate-fade-up">
            <p className="greeting-label">{timeGreeting}</p>
            <h1 className="greeting-heading">
              Welcome back, {firstName}.
            </h1>
            {appsByRoom.length > 0 && (
              <p className="greeting-sub">
                {visibleApps.length} service{visibleApps.length !== 1 ? "s" : ""} ready for you.
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
                      "--delay": `${60 + i * 60}ms`,
                      animationDelay: `${60 + i * 60}ms`,
                    } as React.CSSProperties
                  }
                >
                  <Room room={room} apps={apps} />
                </div>
              ))}
            </div>
          )}
        </main>

        {/* ── Footer ── */}
        <footer className="dash-footer">
          <p>JiangLabs</p>
        </footer>
      </div>

      <style>{`
        .dash-root {
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          background: oklch(0.08 0.012 280);
          position: relative;
          overflow-x: hidden;
        }

        /* Subtle top ambient glow */
        .dash-ambient {
          position: absolute;
          top: -120px;
          left: 50%;
          transform: translateX(-50%);
          width: min(1100px, 120vw);
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(
            ellipse at center,
            oklch(0.50 0.16 285 / 0.06) 0%,
            oklch(0.45 0.10 250 / 0.03) 40%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 0;
          filter: blur(80px);
        }

        /* ── Top bar ── */
        .topbar {
          position: sticky;
          top: 0;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          background: oklch(0.08 0.012 280 / 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid oklch(1 0 0 / 0.04);
          z-index: var(--z-sticky);
        }

        .topbar-wordmark {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          transition: opacity 150ms ease;
        }
        .topbar-wordmark:hover {
          opacity: 0.85;
        }

        .topbar-monogram {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: oklch(0.62 0.19 285 / 0.12);
          box-shadow: 0 0 0 1px oklch(0.62 0.19 285 / 0.2);
          font-size: 0.875rem;
          font-weight: 700;
          color: oklch(0.72 0.16 285);
        }

        .topbar-name {
          font-size: 1.0625rem;
          font-weight: 700;
          color: oklch(0.90 0.005 280);
          letter-spacing: -0.01em;
        }

        /* ── Main ── */
        .dash-main {
          flex: 1;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 48px 80px;
          display: flex;
          flex-direction: column;
          gap: 44px;
          z-index: 1;
        }

        /* ── Greeting ── */
        .dash-greeting {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 6px;
          padding: 40px 24px 16px;
        }

        .greeting-label {
          font-size: 0.8125rem;
          font-weight: 500;
          color: oklch(0.50 0.01 280);
          letter-spacing: 0.02em;
          max-width: none;
        }

        .greeting-heading {
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: oklch(0.96 0.005 280);
          line-height: 1.2;
          text-wrap: balance;
        }

        .greeting-sub {
          font-size: 0.9375rem;
          font-weight: 500;
          color: oklch(0.55 0.015 285);
          letter-spacing: -0.005em;
          margin-top: 4px;
          max-width: none;
        }

        /* ── Rooms ── */
        .rooms-list {
          display: flex;
          flex-direction: column;
          gap: 36px;
        }

        /* ── Footer ── */
        .dash-footer {
          text-align: center;
          padding: 40px 24px;
          font-size: 0.6875rem;
          font-weight: 600;
          color: oklch(0.32 0.01 280);
          z-index: 1;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .dash-main {
            max-width: 900px;
            padding: 32px 32px 64px;
          }
        }

        @media (max-width: 640px) {
          .dash-main {
            padding: 20px 20px 48px;
            gap: 32px;
          }
          .dash-greeting {
            padding: 24px 16px 8px;
          }
          .greeting-heading {
            font-size: 1.65rem;
          }
          .topbar {
            padding: 0 20px;
          }
          .topbar-name {
            display: none;
          }
          .rooms-list {
            gap: 28px;
          }
        }

        @media (max-width: 480px) {
          .hide-on-mobile { display: none !important; }
          .greeting-heading { font-size: 1.5rem; }
        }
      `}</style>
    </>
  );
}
