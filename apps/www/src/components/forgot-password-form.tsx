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
import { Input } from "@repo/ui/components/input";

export function ForgotPasswordForm() {
  const form = useZodForm({
    schema: forgotPasswordSchema,
    defaultValues: { email: "" },
  });
  async function handleSubmit(data: z.infer<typeof forgotPasswordSchema>) {}
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
        <Button type="submit" className="w-full">
          Send reset email
        </Button>
      </form>
    </Form>
  );
}