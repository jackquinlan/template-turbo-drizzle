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
          <CardDescription className="pb-2">
            Enter your email to reset your password
          </CardDescription>
          <hr />
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid gap-4">
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
