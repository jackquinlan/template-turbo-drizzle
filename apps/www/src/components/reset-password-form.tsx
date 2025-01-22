"use client";

import React, { useTransition, useState } from "react";
import Link from "next/link";
import { z } from "zod";

import { updatePasswordSchema } from "@repo/auth/validators";
import { Button } from "@repo/ui/components/button";
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
import { Loading } from "@/components/loading";
import { resetPasswordAction } from "@/actions/auth/reset-password";

export function ResetPasswordForm({ token }: { token: string }) {
  const [isLoading, startTransition] = useTransition();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const form = useZodForm({
    schema: updatePasswordSchema,
    defaultValues: { password: "", passwordConfirmation: "", token: token },
  });
  async function handleSubmit(data: z.infer<typeof updatePasswordSchema>) {
    setSuccess("");
    setError("");
    startTransition(async () => {
      resetPasswordAction(data)
        .then((res) => {
          if (res?.success) setSuccess(res.success);
        })
        .catch((error) => {
          setError(error.message);
        });
    });
  }

  if (success.length > 0) {
    return (
      <div className="flex flex-col gap-3 space-y-2">
        <Alert variant="success">{success}</Alert>
        <Button asChild className="w-full">
          <Link href="/">Back</Link>
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid gap-4 space-y-2"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="••••••••••"
                  type="password"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm new password</FormLabel>
              <FormControl>
                <Input
                  placeholder="••••••••••"
                  type="password"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <Alert variant="destructive">{error}</Alert>}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Loading size="sm" /> : "Update password"}
        </Button>
      </form>
    </Form>
  );
}
