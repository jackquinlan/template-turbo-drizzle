import { v4 as uuid } from "uuid";
import { db, eq, verificationTokens } from "@repo/database";


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
  });
  return newToken;
}
