import * as React from "react";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full items-center justify-center md:w-2/3 xl:w-1/2">
      {children}
    </div>
  );
}