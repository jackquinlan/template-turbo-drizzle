"use server";

import { AuthError } from "next-auth";
import { z } from "zod";

import { signIn } from "@repo/auth/next-auth-options";
import { db, eq, users } from "@repo/database";
import { signUpWithCredentialsSchema } from "@repo/auth/validators";
import { hashPassword } from "@repo/auth/crypto";

export async function signUpWithCredentialsAction(
  values: z.infer<typeof signUpWithCredentialsSchema>,
) {
  const validatedFields = signUpWithCredentialsSchema.safeParse(values);
  if (!validatedFields.success) {
    throw new Error("Invalid credentials");
  }
  const { email, password, name } = validatedFields.data;

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  if (user) {
    throw new Error("User already exists");
  }

  await db.insert(users).values({
    email,
    name,
    hashedPassword: await hashPassword(password),
  });

  // TODO: Add email verification logic eventually
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
          throw new Error("Unable to sign in");
      }
    }
    throw error;
  }
}
