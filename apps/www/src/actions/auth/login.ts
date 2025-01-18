"use server";

import { AuthError } from "next-auth";
import { z } from "zod";
import { signInWithCredentialsSchema } from "@repo/auth/validators";
import { signIn } from "@repo/auth/next-auth-options";

export async function signInWithCredentialsAction(
  values: z.infer<typeof signInWithCredentialsSchema>,
) {
  const validatedFields = signInWithCredentialsSchema.safeParse(values);
  if (!validatedFields.success) {
    throw new Error("Invalid credentials");
  }
  const { email, password } = validatedFields.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("User not found");
        default:
          throw new Error("Incorrect email or password");
      }
    }
    throw error;
  }
}
