import "next-auth";
import type { DefaultSession } from "next-auth";

declare module "@auth/core/types" {
  interface Session {
    user: {
      id: string;
      name: string;
      emailVerified?: string | null;
      email: string;
    } & Omit<DefaultSession, "id">;
  }
  interface User {
    id: string;
    name: string;
    emailVerified?: string | null;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    emailVerified?: string | null;
    email: string;
  }
}
