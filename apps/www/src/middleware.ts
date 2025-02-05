import { NextResponse } from "next/server";

import { auth } from "@repo/auth/next-auth-options";

const PUBLIC_ROUTES: string[] = ["/verify-email", "/reset-password"];
const AUTH_ROUTES: string[] = ["/forgot-password", "/login", "/signup"];

export default auth((req) => {
  const { nextUrl } = req;

  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isAuthenticated = !!req.auth;
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);

  if (nextUrl.pathname.startsWith("/api/auth")) return; // Always needs to be accessible

  if (isAuthRoute) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
    return;
  }

  if (!isAuthenticated && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    );
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
