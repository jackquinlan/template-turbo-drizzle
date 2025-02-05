"use client";

import React, { useState, useTransition } from "react";
import { z } from "zod";

import { signUpWithCredentialsSchema } from "@repo/auth/validators";
import { Button } from "@repo/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  useZodForm,
} from "@repo/ui/components/form";
import { Alert } from "@repo/ui/components/alert";
import { Input } from "@repo/ui/components/input";

import { signUpWithCredentialsAction } from "@/actions/auth/create-account";
import { Loading } from "@/components/loading";

export function SignupForm() {
  const [error, setError] = useState<string>("");
  const [isLoading, startTransition] = useTransition();
  const form = useZodForm({
    schema: signUpWithCredentialsSchema,
    defaultValues: { name: "", email: "", password: "" },
  });
  async function handleSubmit(
    data: z.infer<typeof signUpWithCredentialsSchema>,
  ) {
    setError("");
    startTransition(async () => {
      signUpWithCredentialsAction(data).catch((error) => {
        if (error.message !== "NEXT_REDIRECT") setError(error.message);
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="••••••••••"
                  type="password"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Password must be at least 8 characters long.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <Alert variant="destructive">{error}</Alert>}
        <Button type="submit" className="w-full my-2" disabled={isLoading}>
          {isLoading ? <Loading /> : "Create account"}
        </Button>
      </form>
    </Form>
  );
}
