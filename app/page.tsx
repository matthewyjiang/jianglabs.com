import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SignInButton } from "@/components/SignInButton";

export default async function LandingPage() {
  const session = await auth();

  // Authenticated users go straight to the dashboard
  if (session?.user) {
    redirect("/home");
  }

  return (
    <>
      <div className="landing-root">
        {/* Animated mesh gradient background */}
        <div className="mesh" aria-hidden="true">
          <div className="mesh__blob mesh__blob--1" />
          <div className="mesh__blob mesh__blob--2" />
          <div className="mesh__blob mesh__blob--3" />
        </div>

        <main className="landing-main">
          {/* Brand identity */}
          <div className="landing-brand animate-fade-up">
            <div className="monogram" aria-hidden="true">
              <span>J</span>
            </div>
            <h1 className="brand-name">JiangLabs</h1>
          </div>

          {/* Hero content */}
          <div
            className="landing-hero animate-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            <p className="tagline">
              Your home cloud, all in one place.
            </p>

            <div className="landing-cta">
              <SignInButton />
            </div>

            <p className="privacy-note">
              Private access. What you see depends on your account.
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="landing-footer">
          <p>JiangLabs</p>
        </footer>
      </div>

      <style>{`
        .landing-root {
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          background: oklch(0.07 0.015 280);
        }

        /* ── Mesh gradient background ── */
        .mesh {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .mesh__blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
        }

        .mesh__blob--1 {
          width: min(600px, 80vw);
          height: min(600px, 80vw);
          background: oklch(0.40 0.18 285);
          top: -15%;
          left: -10%;
          opacity: 0.18;
          animation: mesh-drift-1 25s infinite alternate ease-in-out;
        }

        .mesh__blob--2 {
          width: min(500px, 70vw);
          height: min(500px, 70vw);
          background: oklch(0.35 0.14 200);
          bottom: -10%;
          right: -10%;
          opacity: 0.14;
          animation: mesh-drift-2 30s infinite alternate ease-in-out;
        }

        .mesh__blob--3 {
          width: min(400px, 60vw);
          height: min(400px, 60vw);
          background: oklch(0.42 0.12 50);
          top: 45%;
          left: 55%;
          opacity: 0.07;
          animation: mesh-drift-3 22s infinite alternate ease-in-out;
        }

        /* ── Main content ── */
        .landing-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px 24px 64px;
          position: relative;
          z-index: 1;
          gap: 40px;
        }

        /* ── Brand area ── */
        .landing-brand {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .monogram {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 72px;
          height: 72px;
          border-radius: 18px;
          background: oklch(0.62 0.19 285 / 0.1);
          animation: glow-pulse 4s infinite ease-in-out;
        }

        .monogram span {
          font-size: 2rem;
          font-weight: 700;
          color: oklch(0.75 0.16 285);
          line-height: 1;
        }

        .brand-name {
          font-size: 1.5rem;
          font-weight: 700;
          color: oklch(0.92 0.005 280);
          letter-spacing: -0.02em;
        }

        /* ── Hero ── */
        .landing-hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 24px;
          max-width: 420px;
        }

        .tagline {
          font-size: 1.125rem;
          color: oklch(0.60 0.01 280);
          line-height: 1.5;
          max-width: 36ch;
          text-align: center;
        }

        .landing-cta {
          margin-top: 4px;
        }

        .privacy-note {
          font-size: 0.8125rem;
          color: oklch(0.40 0.01 280);
          text-align: center;
          max-width: none;
        }

        /* ── Footer ── */
        .landing-footer {
          text-align: center;
          padding: 32px 24px;
          font-size: 0.6875rem;
          font-weight: 600;
          color: oklch(0.30 0.01 280);
          position: relative;
          z-index: 1;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .mesh__blob {
            animation: none !important;
          }
          .monogram {
            animation: none !important;
            box-shadow: 0 0 0 1px oklch(0.62 0.19 285 / 0.25);
          }
          .landing-hero,
          .landing-brand {
            animation: none;
          }
        }

        @media (max-width: 480px) {
          .monogram {
            width: 60px;
            height: 60px;
            border-radius: 15px;
          }
          .monogram span {
            font-size: 1.75rem;
          }
          .brand-name {
            font-size: 1.25rem;
          }
          .tagline {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
}
