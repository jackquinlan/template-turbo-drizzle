import { v4 as uuid } from "uuid";
import { db, eq, verificationTokens, users } from "@repo/database";

export async function createVerificationToken(email: string) {
  const token = uuid();

  // Check if verification token exists for given email
  const existingTokenExists = await db.query.verificationTokens.findFirst({
    where: eq(verificationTokens.identifier, email),
  });
  if (existingTokenExists) {
    await db.delete(verificationTokens)
      .where(eq(verificationTokens.identifier, email));
  }

  const newToken = await db.insert(verificationTokens).values({
    identifier: email,
    token,
    expires: new Date(Date.now() + 3600 * 1000) // 1 hour
  }).returning();
  return newToken;
}

export async function verifyEmailWithToken(token: string) {
  const verificationToken = await db.query.verificationTokens.findFirst({
    where: eq(verificationTokens.token, token),
  });

  if (!verificationToken) {
    return { error: "Invalid token" };
  }
  if (new Date(verificationToken.expires) < new Date()) {
    return { error: "Token expired" };
  }
  // Update user emailVerified field
  const user = await db.query.users.findFirst({
    where: eq(users.email, verificationToken.identifier),
  });
  if (!user || !user.email) {
    return { error: "Invalid token" };
  }

  await db.update(users)
    .set({
      emailVerified: new Date(),
    })
    .where(eq(users.email, user.email));
}
