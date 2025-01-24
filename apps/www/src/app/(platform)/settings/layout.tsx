import * as React from "react";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full mx-auto items-center md:w-2/3">
      <div className="flex flex-col w-full space-y-4">
        <h1 className="text-2xl font-bold">Settings</h1>
        {children}
      </div>
    </div>
  );
}
