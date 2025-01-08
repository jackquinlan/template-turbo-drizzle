"use client";

import React, { useTransition } from "react";

import { z } from "zod";

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

const signupFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export function SignupForm() {
  const form = useZodForm({ 
    schema: signupFormSchema, 
    defaultValues: { email: "", password: "" },
  });
  async function handleSubmit(data: z.infer<typeof signupFormSchema>) {
    console.log(data);
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="••••••••••"
                  type="password"
                  {...field}
                /> 
              </FormControl>
              <FormDescription>
                Must contain at least one uppercase letter, one number, and
                one special character.
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

