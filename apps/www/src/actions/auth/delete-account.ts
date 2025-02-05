"use server";

import { z } from "zod";

import { auth, signOut } from "@repo/auth/next-auth-options";
import { db, eq, users } from "@repo/database";
import { deleteAccountSchema } from "@repo/auth/validators";

export async function deleteAccountAction(
  data: z.infer<typeof deleteAccountSchema>,
) {
  const validatedFields = deleteAccountSchema.safeParse(data);
  if (!validatedFields.success) {
    throw new Error("User not found");
  }
  const { id } = validatedFields.data;
  try {
    const userExists = await db.query.users.findFirst({
      where: eq(users.id, id),
    });
    if (!userExists) {
      throw new Error("User not found");
    }
  } catch (error) {
    throw new Error("User not found");
  }
  const currentSession = await auth();
  if (!currentSession || currentSession.user.id !== id) {
    throw new Error("Unauthorized");
  }
  // Delete user
  await db.delete(users).where(eq(users.id, id));

  await signOut({ redirectTo: "/" });
  return true;
}
