"use server";

import { z } from "zod";

import { getBaseUrl } from "@/lib/utils";
import { auth } from "@repo/auth/next-auth-options";
import { createVerificationToken } from "@repo/auth/lib/verification-token";
import { updateEmailSchema } from "@repo/auth/validators";
import { db, eq, users } from "@repo/database";
import { sendEmail } from "@repo/emails/send";
import { VerifyUpdateEmailTemplate } from "@repo/emails/templates/verify-update-email";

export async function sendUpdateEmailVerificationAction(
  data: z.infer<typeof updateEmailSchema>,
) {
  const validatedFields = updateEmailSchema.safeParse(data);
  if (!validatedFields.success) {
    throw new Error("Invalid email");
  }
  const { newEmail, userId } = validatedFields.data;

  const emailTaken = await db.query.users.findFirst({
    where: eq(users.email, newEmail),
  });
  if (emailTaken) {
    throw new Error("Email already in use");
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
  if (!user) {
    throw new Error("User not found");
  }
  if (user.email === newEmail) {
    return { message: "" }; // Skip sending email if not changed
  }

  const token = await createVerificationToken(newEmail, user.id);
  const tokenLink = `${getBaseUrl()}/verify-email?token=${token[0].token}`;
  console.log(tokenLink);
  // await sendEmail({
  //   react: VerifyUpdateEmailTemplate(tokenLink),
  //   subject: "Verify your email",
  //   to: [newEmail],
  //   from: "no-reply@jackquinlan.me",
  // });
  return { message: "Verification email sent" };
}