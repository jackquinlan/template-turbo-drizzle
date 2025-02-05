import * as React from "react";
import { redirect } from "next/navigation";

import { verifyEmailWithToken } from "@repo/auth/lib/verification-token";
import { VerifyEmailCard } from "@/components/verify-email-card";

export default async function VerifyEmailPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { token } = await props.searchParams;
  if (!token || !(typeof token === "string")) {
    return redirect("/");
  }
  const verified = await verifyEmailWithToken(token);
  return <VerifyEmailCard error={verified?.error} />;
}
