import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign-in error — Jiang Labs",
};

const ERROR_MESSAGES: Record<string, { heading: string; body: string }> = {
  Configuration: {
    heading: "Server configuration error",
    body: "There is a problem with the server authentication configuration. Please contact the admin.",
  },
  AccessDenied: {
    heading: "Access denied",
    body: "You do not have permission to access this portal. Contact the admin to request access.",
  },
  Verification: {
    heading: "Link expired",
    body: "The sign-in link has expired or has already been used. Please try signing in again.",
  },
  OAuthSignin: {
    heading: "Sign-in failed",
    body: "Could not start the sign-in process. Please try again.",
  },
  OAuthCallback: {
    heading: "Sign-in callback error",
    body: "Something went wrong returning from the identity provider. Please try again.",
  },
  OAuthCreateAccount: {
    heading: "Account creation failed",
    body: "Could not create your account. Please contact the admin.",
  },
  SessionRequired: {
    heading: "Sign in required",
    body: "You need to be signed in to access this page.",
  },
  Default: {
    heading: "Something went wrong",
    body: "An unexpected error occurred during sign-in. Please try again.",
  },
};

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function AuthErrorPage({ searchParams }: Props) {
  const { error } = await searchParams;
  const key = error && error in ERROR_MESSAGES ? error : "Default";
  const { heading, body } = ERROR_MESSAGES[key];

  return (
    <>
      <div className="error-root">
        <main className="error-main">
          <div className="error-card">
            <div className="error-icon" aria-hidden="true">
              <svg
                width={32}
                height={32}
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M16 4L2 28h28L16 4z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  style={{ color: "var(--error)" }}
                />
                <path
                  d="M16 14v6M16 23v1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  style={{ color: "var(--error)" }}
                />
              </svg>
            </div>

            <h1 className="error-heading">{heading}</h1>
            <p className="error-body">{body}</p>

            {error && (
              <p className="error-code">
                Error code: <code>{error}</code>
              </p>
            )}

            <div className="error-actions">
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/api/auth/signin?callbackUrl=/home" className="btn-primary">
                Try signing in again
              </a>
              <Link href="/" className="btn-ghost">
                Back to home
              </Link>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        .error-root {
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .error-main {
          width: 100%;
          max-width: 440px;
        }

        .error-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 40px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 16px;
        }

        .error-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: oklch(0.65 0.20 25 / 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .error-heading {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--ink);
        }

        .error-body {
          font-size: 0.875rem;
          color: var(--ink-muted);
          line-height: 1.65;
          text-align: center;
        }

        .error-code {
          font-size: 0.75rem;
          color: var(--ink-faint);
          max-width: none;
        }

        .error-code code {
          font-family: ui-monospace, monospace;
          background: var(--surface-raised);
          padding: 1px 5px;
          border-radius: 3px;
        }

        .error-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
          margin-top: 8px;
        }

        .btn-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--primary);
          color: oklch(1 0 0);
          border-radius: 8px;
          padding: 0.75rem 1.5rem;
          font-size: 0.9375rem;
          font-weight: 600;
          text-decoration: none;
          transition: background-color 150ms ease-out;
        }
        .btn-primary:hover { background: var(--primary-hover); }

        .btn-ghost {
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          color: var(--ink-muted);
          border-radius: 8px;
          padding: 0.75rem 1.5rem;
          font-size: 0.9375rem;
          font-weight: 500;
          text-decoration: none;
          border: 1px solid var(--border);
          transition: background-color 150ms ease-out, color 150ms ease-out;
        }
        .btn-ghost:hover {
          background: var(--surface-raised);
          color: var(--ink);
        }
      `}</style>
    </>
  );
}
