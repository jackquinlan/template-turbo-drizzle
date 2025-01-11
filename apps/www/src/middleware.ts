import { NextResponse, NextRequest } from "next/server";
import { auth } from "@repo/auth/next-auth-options";

export default async function middleware(request: NextRequest) {
  const session = await auth();
  console.log(session);

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};