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
  CardFooter,
} from "@repo/ui/components/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@repo/ui/components/form";
import { Alert } from "@repo/ui/components/alert";
import { Input } from "@repo/ui/components/input";
import { Badge } from "@repo/ui/components/badge";
import { updateEmailSchema } from "@repo/auth/validators";
import { sendUpdateEmailVerificationAction } from "@/actions/auth/verify-email";
import { Loading } from "@/components/loading";

export function EmailForm({
  currentUser,
  provider,
}: {
  currentUser: User;
  provider?: string;
}) {
  const [isLoading, startTransition] = useTransition();
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [resendClicked, setResendClicked] = useState<boolean>(false);
  const form = useZodForm({
    schema: updateEmailSchema,
    defaultValues: {
      newEmail: currentUser.email ?? "",
      userId: currentUser.id,
    },
  });
  async function handleSubmit(data: z.infer<typeof updateEmailSchema>) {
    setMessage("");
    setError("");
    startTransition(async () => {
      if (data.newEmail === currentUser.email) {
        return; // Only update email if different
      }
      sendUpdateEmailVerificationAction(data, false)
        .then((res) => {
          if (res?.message) setMessage(res.message);
        })
        .catch((error) => {
          setError(error.message);
        });
    });
  }
  async function handleResend() {
    setResendClicked(true);
    setMessage("");
    setError("");
    startTransition(async () => {
      sendUpdateEmailVerificationAction(
        {
          newEmail: currentUser.email ?? "",
          userId: currentUser.id ?? "",
        },
        true,
      )
        .then((res) => {
          if (res?.message) setMessage(res.message);
        })
        .catch((error) => {
          setError(error.message);
        });
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
        <Card className="shadow">
          <CardHeader className="border-b p-4">
            <CardTitle className="flex items-center gap-x-2">
              Your email
              {currentUser.emailVerified ? (
                <Badge variant="success">Verified</Badge>
              ) : (
                <Badge variant="warning">Unverified</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            <FormField
              control={form.control}
              name="newEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="w-1/2"
                      disabled={!!provider || isLoading}
                      placeholder={currentUser.email ?? ""}
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!currentUser.emailVerified && !resendClicked && (
              <div className="flex items-center text-sm gap-x-2">
                <p className="text-muted-foreground">
                  Your email is not verified.
                </p>
                <Button variant="link" className="p-0" onClick={handleResend}>
                  Resend verification link
                </Button>
              </div>
            )}
            {error && <Alert variant="destructive">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
          </CardContent>
          <CardFooter className="border-t text-xs p-4">
            {!provider ? (
              <Button type="submit" size="sm" disabled={isLoading}>
                {isLoading ? <Loading size="sm" /> : "Update"}
              </Button>
            ) : (
              <span>
                Your email is associated with your {provider} account.
              </span>
            )}
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
