"use client";

import React, { useTransition, useState } from "react";
import type { User } from "next-auth";
import { useSession } from "next-auth/react";
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

export function NameForm({
  currentUser,
}: {
  currentUser: User;
}) {
  const [isLoading, startTransition] = useTransition();
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  

  return <div></div>;
}
