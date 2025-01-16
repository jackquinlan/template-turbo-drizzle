"use server";

import { z } from "zod";

import { signIn } from "@repo/auth/next-auth-options";
import { db, eq, users } from "@repo/database";
import { signUpWithCredentialsSchema } from "@repo/auth/validators";
import { hashPassword } from "@repo/auth/crypto";

export async function signUpWithCredentialsAction(values: z.infer<typeof signUpWithCredentialsSchema>) {

  const validatedFields = signUpWithCredentialsSchema.safeParse(values);
  if (!validatedFields.success) {
    throw new Error("Invalid credentials");
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, validatedFields.data.email),
  });
  if (user) {
    throw new Error("User already exists");
  }

  await db
    .insert(users)
    .values({
      email: validatedFields.data.email,
      name: validatedFields.data.name,
      hashedPassword: await hashPassword(validatedFields.data.password),
    });

  // TODO: Add email verification logic eventually
  await signIn("credentials", {
    email: validatedFields.data.email, password: validatedFields.data.password, redirectTo: "/",
  });

  return { status: 200 };
}