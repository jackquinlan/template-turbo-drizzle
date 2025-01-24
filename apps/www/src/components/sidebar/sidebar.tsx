"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import type { User } from "next-auth";
import { LayoutDashboard, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components/sidebar";
import { UserButton } from "@/components/sidebar/user-button";

const items = [{ href: "/", label: "Dashboard", icon: LayoutDashboard }];

export function AppSidebar({ user }: { user: User }) {
  const path = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className="mt-2 dark:bg-background">
        <SidebarMenuButton asChild>
          <UserButton user={user} />
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="space-y-0 dark:bg-background">
        {items.map((item) => (
          <SidebarMenuItem key={item.label} className="px-2">
            <SidebarMenuButton asChild isActive={item.href === path}>
              <Link href={item.href}>
                <div className="flex items-center gap-2">
                  <item.icon className="size-4" />
                  <span>{item.label}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
