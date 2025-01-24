"use server";

import { z } from "zod";

import { db, eq, users } from "@repo/database";
import { getBaseUrl } from "@/lib/utils";
import { signUpWithCredentialsSchema } from "@repo/auth/validators";
import { hashPassword } from "@repo/auth/crypto";
import { createVerificationToken } from "@repo/auth/lib/verification-token";
import { sendEmail } from "@repo/emails/send";
import { VerifyEmailTemplate } from "@repo/emails/templates/verify";

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

  const newUser = await db
    .insert(users)
    .values({
      email,
      name,
      hashedPassword: await hashPassword(password),
    })
    .returning();

  try {
    const token = await createVerificationToken(email, newUser[0].id);
    const tokenLink = `${getBaseUrl()}/verify-email?token=${token[0].token}`;
    await sendEmail({
      react: VerifyEmailTemplate(tokenLink),
      subject: "Welcome! Please verify your email",
      to: [email],
      from: "no-reply@jackquinlan.me",
    });
  } catch (error) {
    throw new Error("Error sending verification email.");
  }
  return { message: "Verification email sent" };
}
