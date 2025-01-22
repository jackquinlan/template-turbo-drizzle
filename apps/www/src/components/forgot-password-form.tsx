"use client";

import React, { useTransition, useState } from "react";
import { z } from "zod";

import { forgotPasswordSchema } from "@repo/auth/validators";
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
import { sendResetTokenEmailAction } from "@/actions/auth/reset-password";

export function ForgotPasswordForm() {
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, startTransition] = useTransition();
  const form = useZodForm({
    schema: forgotPasswordSchema,
    defaultValues: { email: "" },
  });
  async function handleSubmit(data: z.infer<typeof forgotPasswordSchema>) {
    setMessage("");
    setError("");
    startTransition(async () => {
      sendResetTokenEmailAction(data)
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
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid gap-4 space-y-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="m@example.com"
                  type="email"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <Alert variant="destructive">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Loading size="sm" /> : "Send reset email"}
        </Button>
      </form>
    </Form>
  );
}
