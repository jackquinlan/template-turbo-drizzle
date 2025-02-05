"use server";

import { z } from "zod";

import { auth } from "@repo/auth/next-auth-options";
import { updateProfileSchema } from "@repo/auth/validators";
import { db, eq, users } from "@repo/database";

export async function updateProfileSettingsAction(
  data: z.infer<typeof updateProfileSchema>,
) {
  const validatedFields = updateProfileSchema.safeParse(data);
  if (!validatedFields.success) {
    throw new Error("Invalid data");
  }
  const { name } = validatedFields.data;
  const user = await auth();
  if (!user) {
    throw new Error("Unathorized");
  }
  if (user.user.name === name) {
    return; // Don't update unless different
  }
  await db.update(users).set({ name: name }).where(eq(users.id, user.user.id));
}
