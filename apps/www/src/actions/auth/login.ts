"use server";

import { AuthError } from "next-auth";
import { z } from "zod";

import { db, eq, users } from "@repo/database";
import { getBaseUrl } from "@/lib/utils";
import { signInWithCredentialsSchema } from "@repo/auth/validators";
import { signIn } from "@repo/auth/next-auth-options";
import { createVerificationToken } from "@repo/auth/lib/verification-token";
import { sendEmail } from "@repo/emails/send";
import { VerifyEmailTemplate } from "@repo/emails/templates/verify";

export async function signInWithCredentialsAction(
  values: z.infer<typeof signInWithCredentialsSchema>,
  callbackUrl?: string | null,
) {
  const validatedFields = signInWithCredentialsSchema.safeParse(values);
  if (!validatedFields.success) {
    throw new Error("Invalid credentials");
  }
  const { email, password } = validatedFields.data;
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  if (!existingUser || !existingUser.email || !existingUser.hashedPassword) {
    throw new Error("Invalid email or password");
  }

  if (!existingUser.emailVerified) {
    const token = await createVerificationToken(email, existingUser.id);
    const tokenLink = `${getBaseUrl()}/verify-email?token=${token[0].token}`;

    // Resend verification email
    await sendEmail({
      react: VerifyEmailTemplate(tokenLink),
      subject: "Welcome! Please verify your email",
      to: [email],
      from: process.env.RESEND_FROM_EMAIL!,
    });
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("Incorrect email or password");
        default:
          throw new Error("User not found");
      }
    }
    throw error;
  }
}
