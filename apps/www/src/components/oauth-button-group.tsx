"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";

import { Button } from "@repo/ui/components/button";

export function OAuthButtonGroup() {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl");
  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="outline"
        className="w-full gap-2"
        onClick={async () =>
          await signIn("github", { redirectTo: callbackUrl || "/" })
        }
      >
        <GitHubLogoIcon className="w-4 h-4" />
        Continue with Github
      </Button>
    </div>
  );
}
