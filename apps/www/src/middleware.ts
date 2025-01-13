import { NextResponse } from "next/server";
import { auth } from "@repo/auth/next-auth-options";

export default auth((req) => {
  console.log(req.auth);
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|assets|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"]
};