import React from "react";
import Link from "next/link";

import { Button } from "@repo/ui/components/button";
import { auth } from "@repo/auth/next-auth-options";

import { SignOut } from "@/components/signout";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex min-h-svh flex-col items-center gap-6 p-6 md:p-10">
      <div className="flex items-center gap-2">
        {session ? (
          <SignOut />
        ) : (
          <Button size="sm" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
        )}
      </div>
      Home
      {session && <pre>{JSON.stringify(session.user, null, 2)}</pre>}
    </div>
  );
}
