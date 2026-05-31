"use client";

import { signIn } from "next-auth/react";

interface SignInButtonProps {
  className?: string;
}

export function SignInButton({ className }: SignInButtonProps) {
  return (
    <button
      onClick={() => signIn("authentik", { callbackUrl: "/home" })}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        backgroundColor: "var(--primary)",
        color: "oklch(1 0 0)",
        border: "none",
        borderRadius: "8px",
        padding: "0.75rem 1.75rem",
        fontSize: "1rem",
        fontWeight: 600,
        fontFamily: "inherit",
        cursor: "pointer",
        transition: "background-color 150ms ease-out, transform 100ms ease-out",
        lineHeight: 1,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
          "var(--primary-hover)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
          "var(--primary)";
      }}
      onMouseDown={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)";
      }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
      }}
    >
      Sign in
    </button>
  );
}
