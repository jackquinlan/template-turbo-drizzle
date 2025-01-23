import * as React from "react";
import { Geist } from "next/font/google";
import type { Metadata } from "next";

import { Providers } from "@/_providers";
import "@repo/ui/globals.css";

export const geist = Geist({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Repo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${geist.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
