import React from "react";
import Link from "next/link";

import { auth } from "@repo/auth/next-auth-options";
import { Button } from "@repo/ui/components/button";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex min-h-svh flex-col items-center gap-6 p-6 md:p-10">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href="/signup">Sign up</Link>
        </Button>
      </div>
      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
    </div>
  );
}
