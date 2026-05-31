import NextAuth from "next-auth";
import Authentik from "next-auth/providers/authentik";
import type { NextAuthConfig } from "next-auth";

/**
 * Type augmentation — extend the built-in session/JWT types to carry the
 * extra fields we need (access token, groups, sub).
 */
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    idToken?: string;
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username?: string | null;
      sub?: string;
      groups?: string[];
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    accessToken?: string;
    idToken?: string;
    username?: string;
    sub?: string;
    groups?: string[];
  }
}

const config: NextAuthConfig = {
  trustHost: true,
  providers: [
    Authentik({
      clientId: process.env.AUTHENTIK_CLIENT_ID!,
      clientSecret: process.env.AUTHENTIK_CLIENT_SECRET!,
      issuer: process.env.AUTHENTIK_ISSUER!,
      authorization: {
        params: {
          scope:
            "openid profile email offline_access goauthentik.io/api",
        },
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, account, profile }) {
      // On initial sign-in, persist tokens and profile claims
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      if (profile) {
        // Authentik puts preferred_username and groups in the profile
        const p = profile as Record<string, unknown>;
        token.username =
          typeof p.preferred_username === "string"
            ? p.preferred_username
            : undefined;
        token.groups = Array.isArray(p.groups)
          ? (p.groups as string[])
          : [];
      }
      return token;
    },

    async session({ session, token }) {
      // Expose only what the server components need — never expose to the browser
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      session.user.username = token.username;
      session.user.sub = token.sub ?? undefined;
      session.user.groups = token.groups ?? [];
      return session;
    },
  },

  pages: {
    error: "/auth/error",
  },
};

const nextAuth = NextAuth(config);
export const { auth, signIn, signOut } = nextAuth;
export const { GET, POST } = nextAuth.handlers;
