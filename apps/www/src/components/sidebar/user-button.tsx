import * as React from "react";
import Link from "next/link";

import type { User } from "next-auth";
import { signOut } from "next-auth/react";
import { CircleUserIcon, SunIcon, MoonIcon, LogOutIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Avatar, AvatarFallback } from "@repo/ui/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@repo/ui/components/dropdown-menu";

export function UserButton({ user }: { user: User }) {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none flex items-center rounded-md hover:bg-muted">
        <div className="outline-none flex items-center p-2 gap-2">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="border-border border bg-sidebar-primary text-sidebar-primary-foreground" />
          </Avatar>
          <div className="flex flex-col text-left text-xs">
            <h1 className="text-md font-medium">{user.name}</h1>
            <h2>{user.email}</h2>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/settings/profile">
              <CircleUserIcon className="size-4" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            {theme === "dark" ? (
              <div onClick={() => setTheme("light")}>
                <SunIcon className="size-4" />
                Toggle theme
              </div>
            ) : (
              <div onClick={() => setTheme("dark")}>
                <MoonIcon className="size-4" />
                Toggle theme
              </div>
            )}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ redirectTo: "/login" })}>
          <LogOutIcon className="size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
