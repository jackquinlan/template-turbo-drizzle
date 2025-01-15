"use client";

import React, { useState, useTransition } from "react";
import { z } from "zod";

import { signUpWithCredentialsSchema } from "@repo/auth/validators";
import { signIn } from "next-auth/react";
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
import { Input } from "@repo/ui/components/input";

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
    startTransition(async () => {
      await fetch("/api/auth/create-user", {
        body: JSON.stringify({
          ...data,
        }),
        method: "POST",
      })
        .then(async () => {
          await signIn("credentials", {
            ...data,
            redirectTo: "/",
          });
        })
        .catch((error) => setError(error.message));
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
                <Input placeholder="John Doe" {...field} />
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
                <Input placeholder="m@example.com" type="email" {...field} />
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
                <Input placeholder="••••••••••" type="password" {...field} />
              </FormControl>
              <FormDescription>
                Password must be at least 8 characters long.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full my-2">
          Create account
        </Button>
      </form>
    </Form>
  );
}
