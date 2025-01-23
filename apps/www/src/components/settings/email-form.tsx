"use client";

import * as React from "react";

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
import { Input } from "@repo/ui/components/input";
import { updateEmailSchema } from "@repo/auth/validators";

export function EmailForm({
  currentEmail,
  provider,
}: {
  currentEmail: string;
  provider?: string;
}) {
  const hasProvider = provider !== undefined;
  const form = useZodForm({
    schema: updateEmailSchema,
    defaultValues: { email: currentEmail },
  });
  return (
    <Form {...form}>
      <form>
        <Card cardBackground={false}>
          <CardHeader className="border-b p-4">
            <CardTitle>Your email</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
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
                      placeholder={currentEmail} 
                      type="email" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="border-t text-xs p-4">
            {!provider ? (
              <Button type="submit" size="sm">Update email</Button>
            ) : (
              <span>Your email is associated with your {provider} account.</span>
            )}
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}