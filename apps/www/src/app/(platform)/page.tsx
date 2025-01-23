import React from "react";

import { auth } from "@repo/auth/next-auth-options";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col items-center gap-6 p-6 md:p-10">
      Home
      {session && <pre>{JSON.stringify(session.user, null, 2)}</pre>}
    </div>
  );
}
