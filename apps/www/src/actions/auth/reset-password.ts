"use server";

import { z } from "zod";

import { getBaseUrl } from "@/lib/utils";
import {
  forgotPasswordSchema,
  updatePasswordSchema,
} from "@repo/auth/validators";
import { db, eq, users, resetPasswordTokens } from "@repo/database";
import { createResetToken } from "@repo/auth/lib/reset-token";
import { ResetPasswordTemplate } from "@repo/emails/templates/reset-password";
import { sendEmail } from "@repo/emails/send";
import { hashPassword, verifyPassword } from "@repo/auth/crypto";

export async function sendResetTokenEmailAction(
  values: z.infer<typeof forgotPasswordSchema>,
) {
  const validatedFields = forgotPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    throw new Error("Invalid email");
  }
  const { email } = validatedFields.data;

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  if (!existingUser || !existingUser.email) {
    return {
      message:
        "If an account with that email exists, we will send you an email with instructions to reset your password.",
    };
  }
  const token = await createResetToken(email);
  const tokenLink = `${getBaseUrl()}/reset-password?token=${token[0].token}`;

  await sendEmail({
    react: ResetPasswordTemplate(tokenLink),
    subject: "Reset your password",
    to: [email],
    from: process.env.RESEND_FROM_EMAIL!,
  });
  return {
    message:
      "If an account with that email exists, we will send you an email with instructions to reset your password.",
  };
}

export async function resetPasswordAction(
  values: z.infer<typeof updatePasswordSchema>,
) {
  const validatedFields = updatePasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    throw new Error("Invalid password");
  }
  const { password, token } = validatedFields.data;

  const resetToken = await db.query.resetPasswordTokens.findFirst({
    where: eq(resetPasswordTokens.token, token),
  });
  if (!resetToken) {
    throw new Error("Invalid token.");
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, resetToken.email),
  });
  if (!user || !user.hashedPassword) {
    throw new Error("User not found.");
  }

  if (await verifyPassword(user.hashedPassword, password)) {
    throw new Error("You cannot use the same password.");
  }

  // Update user's password
  await db
    .update(users)
    .set({
      hashedPassword: await hashPassword(password),
    })
    .where(eq(users.id, user.id));

  // Delete token
  await db
    .delete(resetPasswordTokens)
    .where(eq(resetPasswordTokens.token, resetToken.token));

  return { success: "Password reset successfully" };
}
