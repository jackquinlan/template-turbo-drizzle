"use client";

import React from "react";
import type { User } from "next-auth";
import { z } from "zod";

import { AlertDialog } from "@repo/ui/components/alert-dialog";
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
  useZodForm,
} from "@repo/ui/components/form";
import { deleteAccountSchema } from "@repo/auth/validators";

export function DeleteAccountCard({
  currentUser,
}: {
  currentUser: User;
}) {
  const form = useZodForm({
    schema: deleteAccountSchema,
    defaultValues: {
      id: currentUser.id ?? "",
    },
  });
  async function handleSubmit(data: z.infer<typeof deleteAccountSchema>) {
    console.log(data);
  }
  return (
    <div></div>
  );
}

function DeleteAccountDialog() {
  return (
    <AlertDialog></AlertDialog>
  );
}