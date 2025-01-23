import * as React from "react";
import { redirect } from "next/navigation";

import { auth } from "@repo/auth/next-auth-options";
import { db, eq, accounts } from "@repo/database";

import { EmailForm } from "@/components/settings/email-form";


export default async function ProfileSettingsPage() {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }
  const hasProvider = await db.query.accounts.findFirst({
    where: eq(accounts.userId, session.user.id),
  });

  return (
    <div className="flex flex-col space-y-4">
      <EmailForm currentEmail={session.user.email} provider={hasProvider?.provider === "github" ? "GitHub" : undefined} />
    </div>
  );
}