import { v4 as uuid } from "uuid";
import { db, eq, resetPasswordTokens, users } from "@repo/database";

export async function createResetToken(email: string) {
  const token = uuid();

  // Check if verification token exists for given email
  const existingTokenExists = await db.query.resetPasswordTokens.findFirst({
    where: eq(resetPasswordTokens.email, email),
  });
  if (existingTokenExists) {
    await db
      .delete(resetPasswordTokens)
      .where(eq(resetPasswordTokens.email, email));
  }
  const newToken = await db
    .insert(resetPasswordTokens)
    .values({
      email: email,
      token,
      expires: new Date(Date.now() + 3600 * 1000), // 1 hour
    })
    .returning();

  return newToken;
}

export async function validateResetToken(token: string) {
  const existingTokenExists = await db.query.resetPasswordTokens.findFirst({
    where: eq(resetPasswordTokens.token, token),
  });
  if (!existingTokenExists) {
    return { error: "Invalid token" };
  }
  if (new Date(existingTokenExists.expires) < new Date()) {
    return { error: "Token expired. Please generate a new token." };
  }
  // Token is valid
  return { message: "Token valid" };
}
