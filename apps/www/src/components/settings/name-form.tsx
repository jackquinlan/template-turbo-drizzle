"use client";

import React, { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
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
import { updateProfileSchema } from "@repo/auth/validators";
import { Alert } from "@repo/ui/components/alert";
import { Input } from "@repo/ui/components/input";
import { updateProfileSettingsAction } from "@/actions/auth/settings";
import { Loading } from "@/components/loading";

export function NameForm({ currentUser }: { currentUser: User }) {
  const [isLoading, startTransition] = useTransition();
  const [error, setError] = useState<string>("");

  const form = useZodForm({
    schema: updateProfileSchema,
    defaultValues: {
      name: currentUser.name ?? "",
    },
  });

  const router = useRouter();
  async function handleSubmit(data: z.infer<typeof updateProfileSchema>) {
    if (data.name === currentUser.name) return;
    setError("");
    startTransition(async () => {
      updateProfileSettingsAction(data)
        .then(() => {
          router.refresh();
        })
        .catch((error) => {
          setError(error.message);
        });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
        <Card className="shadow">
          <CardHeader className="border-b p-4">
            <CardTitle>General</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="w-1/2"
                      disabled={isLoading}
                      placeholder={currentUser.name ?? "John Doe"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <Alert variant="destructive">{error}</Alert>}
          </CardContent>
          <CardFooter className="border-t text-xs p-4">
            <Button type="submit" size="sm" disabled={isLoading}>
              {isLoading ? <Loading size="sm" /> : "Update"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
