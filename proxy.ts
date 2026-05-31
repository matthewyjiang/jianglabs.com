import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function getPublicOrigin(req: NextRequest) {
  const proto = req.headers.get("x-forwarded-proto") ?? req.nextUrl.protocol.replace(/:$/, "");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? req.nextUrl.host;
  return `${proto}://${host}`;
}

function getCallbackPath(req: NextRequest) {
  const path = `${req.nextUrl.pathname}${req.nextUrl.search}`;
  return path.length > 0 ? path : "/home";
}

export function proxy(req: NextRequest) {
  // Auth.js v5: use the auth() function server-side to check session.
  // In proxy/middleware context we do a lightweight cookie check.
  // Full session checks happen in the page server components.

  const { pathname } = req.nextUrl;

  // Check for session cookie presence (lightweight — no crypto in edge).
  // Auth.js may chunk large JWT cookies into suffixes like `.0`, `.1`, etc.
  const hasSession = req.cookies
    .getAll()
    .some(({ name }) =>
      name === "authjs.session-token" ||
      name.startsWith("authjs.session-token.") ||
      name === "__Secure-authjs.session-token" ||
      name.startsWith("__Secure-authjs.session-token.")
    );

  // Protect /home — redirect unauthenticated users to sign-in
  if (pathname.startsWith("/home") && !hasSession) {
    const signInUrl = new URL("/api/auth/signin", getPublicOrigin(req));
    signInUrl.searchParams.set("callbackUrl", getCallbackPath(req));
    return NextResponse.redirect(signInUrl);
  }

  // Redirect authenticated users from root to /home
  if (pathname === "/" && hasSession) {
    return NextResponse.redirect(new URL("/home", getPublicOrigin(req)));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip static assets, Next internals, and the auth API routes
    "/((?!api/auth|_next/static|_next/image|favicon.ico|robots.txt).*)",
  ],
};
