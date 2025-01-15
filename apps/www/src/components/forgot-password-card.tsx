import * as React from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { ForgotPasswordForm } from "@/components/forgot-password-form";

export function ForgotPasswordCard() {
  return (
    <div className="flex flex-col gap-3">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot password?</CardTitle>
          <CardDescription>
            Enter your email to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border" />
            <ForgotPasswordForm />
          </div>
        </CardContent>
      </Card>
      <div className="text-center text-sm mt-2">
        <Link
          href="/login"
          className="hover:underline underline-offset-4 hover:text-primary"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
