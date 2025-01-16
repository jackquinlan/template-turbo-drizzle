"use server";

import { z } from "zod";
import { signInWithCredentialsSchema } from "@repo/auth/validators";
import { sign } from "crypto";

export async function signInWithCredentialsAction(values: z.infer<typeof signInWithCredentialsSchema>) {
  const validatedFields = signInWithCredentialsSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid credentials" }
  }
  console.log(values);
}