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
import { updateEmailSchema } from "@repo/auth/validators";
import { sendUpdateEmailVerificationAction } from "@/actions/auth/settings";
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
  const hasProvider = provider !== undefined;
  const form = useZodForm({
    schema: updateEmailSchema,
    defaultValues: { email: currentUser.email ?? "", userId: currentUser.id },
  });
  async function handleSubmit(data: z.infer<typeof updateEmailSchema>) {
    setMessage("");
    setError("");
    startTransition(async () => {
      if (data.email === currentUser.email) {
        return; // Only update email if different
      }
      sendUpdateEmailVerificationAction(data)
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
        <Card cardBackground={false}>
          <CardHeader className="border-b p-4">
            <CardTitle>Your email</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="w-1/2"
                      disabled={hasProvider}
                      placeholder={currentUser.email ?? ""} 
                      type="email" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <Alert variant="destructive">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
          </CardContent>
          <CardFooter className="border-t text-xs p-4">
            {!provider ? (
              <Button type="submit" size="sm" disabled={isLoading}>
                {isLoading ? <Loading size="sm" /> : "Update email"}
              </Button>
            ) : (
              <span>Your email is associated with your {provider} account.</span>
            )}
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}