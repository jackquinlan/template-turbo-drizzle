"use server";

import { AuthError } from "next-auth";
import { db, eq, users } from "@repo/database";
import { z } from "zod";
import { getBaseUrl } from "@/lib/utils";
import { signInWithCredentialsSchema } from "@repo/auth/validators";
import { signIn } from "@repo/auth/next-auth-options";
import { createVerificationToken } from "@repo/auth/lib/verification-token";
import { sendEmail } from "@repo/emails/send";
import { VerifyEmailTemplate } from "@repo/emails/templates/verify";

export async function signInWithCredentialsAction(
  values: z.infer<typeof signInWithCredentialsSchema>,
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
    throw new Error("Invalid credentials");
  }

  if (!existingUser.emailVerified) {
    const token = await createVerificationToken(email);
    const tokenLink = `${getBaseUrl()}/verify-email?token=${token}`;
    // Resend verification email
    await sendEmail({
      react: VerifyEmailTemplate(tokenLink),
      subject: "Verify your email",
      to: [email],
      from: "no-reply@jackquinlan.me",
    });
  }

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
