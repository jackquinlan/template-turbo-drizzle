"use client";

import * as React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="light"
        enableColorScheme
        disableTransitionOnChange
      >
        {children}
      </NextThemesProvider>
    </SessionProvider>
  );
}
