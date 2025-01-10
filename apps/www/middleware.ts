export { auth as middleware } from "@repo/auth/next-auth-options";

export const config = {
  matcher: ["/", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};