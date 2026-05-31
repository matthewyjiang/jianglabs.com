import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  // Auth.js v5: use the auth() function server-side to check session.
  // In proxy/middleware context we do a lightweight cookie check.
  // Full session checks happen in the page server components.

  const { pathname } = req.nextUrl;

  // Check for session cookie presence (lightweight — no crypto in edge)
  const hasSession =
    req.cookies.has("authjs.session-token") ||
    req.cookies.has("__Secure-authjs.session-token");

  // Protect /home — redirect unauthenticated users to sign-in
  if (pathname.startsWith("/home") && !hasSession) {
    const signInUrl = new URL("/api/auth/signin", req.nextUrl.origin);
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.href);
    return NextResponse.redirect(signInUrl);
  }

  // Redirect authenticated users from root to /home
  if (pathname === "/" && hasSession) {
    return NextResponse.redirect(new URL("/home", req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip static assets, Next internals, and the auth API routes
    "/((?!api/auth|_next/static|_next/image|favicon.ico|robots.txt).*)",
  ],
};
