"use client";

import React, { useTransition, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { z } from "zod";

import { signInWithCredentialsSchema } from "@repo/auth/validators";
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

import { signInWithCredentialsAction } from "@/actions/auth/login";
import { Loading } from "@/components/loading";

export function LoginForm() {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl");
  const [isLoading, startTransition] = useTransition();
  const [error, setError] = useState<string>("");
  const form = useZodForm({
    schema: signInWithCredentialsSchema,
    defaultValues: { email: "", password: "" },
  });
  async function handleSubmit(
    data: z.infer<typeof signInWithCredentialsSchema>,
  ) {
    setError("");
    startTransition(async () => {
      signInWithCredentialsAction(data, callbackUrl).catch((error) => {
        if (error.message !== "NEXT_REDIRECT") setError(error.message);
      });
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Password</FormLabel>
                <Link
                  href="/forgot-password"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <FormControl>
                <Input type="password" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <Alert variant="destructive">{error}</Alert>}
        <Button type="submit" className="w-full my-2" disabled={isLoading}>
          {isLoading ? <Loading size="sm" /> : "Sign in"}
        </Button>
      </form>
    </Form>
  );
}
