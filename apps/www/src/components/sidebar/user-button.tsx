import * as React from "react";
import Link from "next/link";
import type { User } from "next-auth";

import { Avatar, AvatarFallback } from "@repo/ui/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@repo/ui/components/dropdown-menu";
import { CircleUserIcon } from "lucide-react";

export function UserButton({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none flex items-center">
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
      <DropdownMenuContent className="w-56" align="start">
        <div className="flex items-center gap-2 p-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="border-border border bg-transparent" />
          </Avatar>
          <div className="flex flex-col text-left text-xs">
            <h1 className="text-md font-medium">{user.name}</h1>
            <h2>{user.email}</h2>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/settings/profile">
              <CircleUserIcon className="size-4" />
              Profile
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
