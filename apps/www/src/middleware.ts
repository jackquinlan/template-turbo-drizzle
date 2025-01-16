import { auth } from "@repo/auth/next-auth-options";

const AUTH_ROUTES: string[] = [
  "/forgot-password", "/login", "/signup",
];

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);

  if (nextUrl.pathname.startsWith("/api/auth")) return; // Always needs to be accessible

  if (isAuthRoute) {
    if (isAuthenticated) {
      return Response.redirect(new URL("/", nextUrl));
    }
    return;
  }
  
  if (!isAuthenticated) {
    return Response.redirect(new URL("/login", nextUrl));
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
