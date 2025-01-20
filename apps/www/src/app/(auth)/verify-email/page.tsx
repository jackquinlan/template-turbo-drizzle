import * as React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { GalleryVerticalEnd } from "lucide-react";

import { Alert } from "@repo/ui/components/alert";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { verifyEmailWithToken } from "@repo/auth/lib/verification-token";

export default async function VerifyEmailPage(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const { token } = await props.searchParams;
  if (!token || !(typeof token === "string")) {
    return redirect("/");
  }
  const verified = await verifyEmailWithToken(token);
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6">
      <div className="flex w-full max-w-md flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </Link>
        <div className="flex flex-col gap-3">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Verify your email</CardTitle>
              <CardDescription className="pb-2">Please verify your email address before signing in</CardDescription>
              <hr />
            </CardHeader>
            <CardContent>
              {verified?.error ? (
                <div className="flex flex-col gap-3">
                  <Alert variant="destructive">{verified.error}</Alert>
                  <Button asChild className="w-full">
                    <Link href="/login">Sign in</Link>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 space-y-3">
                  <Alert variant="success">
                    Your email has been verified! You can now sign in.
                  </Alert>
                  <Button asChild className="w-full">
                    <Link href="/login">Sign in</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}