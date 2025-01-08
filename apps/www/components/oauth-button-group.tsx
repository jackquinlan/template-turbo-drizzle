import React from "react";

import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { signIn } from "@repo/auth/next-auth-options";
import { Button } from "@repo/ui/components/button";

export function OAuthButtonGroup() {
  return (
    <div className="flex flex-col gap-4">
      <form
        action={async () => {
          "use server";
          await signIn("github", { redirectTo: "/" });
        }}
        className="w-full"
      >
        <Button variant="outline" className="w-full gap-2">
          <GitHubLogoIcon className="w-4 h-4" />
          Continue with Github
        </Button>
      </form>
    </div>
  );
}