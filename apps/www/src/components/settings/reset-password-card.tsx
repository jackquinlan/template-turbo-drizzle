"use client";

import React, { useTransition, useState } from "react";
import type { User } from "next-auth";
import { z } from "zod";

import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@repo/ui/components/card";
import { Form, useZodForm } from "@repo/ui/components/form";
import { Alert } from "@repo/ui/components/alert";
import { forgotPasswordSchema } from "@repo/auth/validators";
import { sendResetTokenEmailAction } from "@/actions/auth/reset-password";
import { Loading } from "@/components/loading";

export function ResetPasswordCard({ currentUser }: { currentUser: User }) {
  const [isLoading, startTransition] = useTransition();
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const form = useZodForm({
    schema: forgotPasswordSchema,
    defaultValues: {
      email: currentUser.email ?? "",
    },
  });
  async function handleSubmit(data: z.infer<typeof forgotPasswordSchema>) {
    setMessage("");
    setError("");
    startTransition(async () => {
      sendResetTokenEmailAction(data)
        .then((res) => {
          if (res?.message)
            setMessage("An email has been sent to reset your password.");
        })
        .catch((error) => {
          setError(error.message);
        });
    });
  }
  return (
    <Card className="shadow">
      <CardHeader className="border-b p-4">
        <CardTitle>Security</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid gap-4"
          >
            <p className="text-muted-foreground text-sm">
              Click the button below to reset your password.
            </p>
            {error && <Alert variant="destructive">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Button
              variant="destructive"
              type="submit"
              size="sm"
              className="w-fit"
              disabled={isLoading}
            >
              {isLoading ? <Loading /> : "Reset password"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
