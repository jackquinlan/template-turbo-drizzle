"use client";

import * as React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { TooltipProvider } from "@repo/ui/components/tooltip";

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
        <TooltipProvider delayDuration={2}>
          {children}
        </TooltipProvider>
      </NextThemesProvider>
    </SessionProvider>
  );
}
