"use client";

import React, { useTransition, useState } from "react";
import Link from "next/link";
import { z } from "zod";

import { signInWithCredentialsSchema } from "@repo/auth/validators";
import { signIn } from "next-auth/react";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { Input } from "@repo/ui/components/input";

export function LoginForm() {
  const [error, setError] = useState<string>("");
  const [isLoading, startTransition] = useTransition();
  const form = useZodForm({ 
    schema: signInWithCredentialsSchema, 
    defaultValues: { email: "", password: "" },
  });
  async function handleSubmit(data: z.infer<typeof signInWithCredentialsSchema>) {
    startTransition(async () => {
      await signIn("credentials", {
        ...data, redirectTo: "/",
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
                <Input type="password" {...field} /> 
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full my-2">
          Sign in
        </Button>
      </form>
    </Form>
  );
}

