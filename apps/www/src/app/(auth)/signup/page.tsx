import * as React from "react";
import Link from "next/link";

import { GalleryVerticalEnd } from "lucide-react";

import { SignupCard } from "@/components/signup-card";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh bg-muted lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-6">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <SignupCard />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:flex items-center justify-center">
        <div className="absolute inset-6 rounded-md bg-white dark:bg-card shadow-md"></div>
      </div>
    </div>
  );
}
