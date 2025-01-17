import * as React from "react";

import { Button } from "@repo/ui/components/button";
import { signOut } from "@repo/auth/next-auth-options";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
      className="w-full"
    >
      <Button type="submit" className="w-full gap-2">
        Sign out
      </Button>
    </form>
  );
}