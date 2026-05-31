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
        {/* Aurora glow — decorative, behind the hero text only */}
        <div className="aurora" aria-hidden="true" />

        <main className="landing-main">
          {/* Wordmark */}
          <header className="landing-wordmark">
            <span className="wordmark-text">JiangLabs</span>
          </header>

          {/* Hero */}
          <section className="hero" aria-labelledby="hero-heading">
            <h1 id="hero-heading" className="hero-heading">
              Your home cloud,
              <br />
              <span className="hero-accent">all in one place.</span>
            </h1>

            <p className="hero-body">
              JiangLabs brings your media, photos, music, AI tools, and more
              into one calm front door.
            </p>

            <div className="hero-cta">
              <SignInButton />
            </div>

            <p className="hero-note">
              Private access. What you see depends on your account.
            </p>
          </section>
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
        }

        /* Aurora glow */
        .aurora {
          position: absolute;
          top: -20%;
          left: 50%;
          transform: translateX(-50%);
          width: min(900px, 120vw);
          height: min(700px, 80vh);
          border-radius: 50%;
          background: radial-gradient(
            ellipse at center,
            oklch(0.62 0.19 285 / 0.12) 0%,
            oklch(0.80 0.10 55  / 0.06) 40%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 0;
          filter: blur(60px);
        }

        .landing-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px 24px 64px;
          position: relative;
          z-index: 1;
          gap: 48px;
        }

        .landing-wordmark {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .wordmark-text {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--ink-muted);
          letter-spacing: -0.01em;
        }

        .hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 20px;
          max-width: 600px;
          animation: fade-up 300ms ease-out both;
        }

        .hero-heading {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.15;
          color: var(--ink);
          text-wrap: balance;
        }

        .hero-accent {
          color: var(--primary);
        }

        .hero-body {
          font-size: 1.0625rem;
          color: var(--ink-muted);
          line-height: 1.65;
          max-width: 52ch;
          text-align: center;
          text-wrap: pretty;
        }

        .hero-cta {
          margin-top: 8px;
          animation: fade-up 300ms ease-out 80ms both;
        }

        .hero-note {
          font-size: 0.8125rem;
          color: var(--ink-faint);
          text-align: center;
          max-width: none;
        }

        .landing-footer {
          text-align: center;
          padding: 24px;
          font-size: 0.75rem;
          color: var(--ink-faint);
          position: relative;
          z-index: 1;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero,
          .hero-cta {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
