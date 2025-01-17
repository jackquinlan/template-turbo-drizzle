import type { NextAuthConfig, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import Credentials from "@auth/core/providers/credentials";
import Github from "next-auth/providers/github";

import { db, eq, users } from "@repo/database";
import { verifyPassword } from "./crypto";
import { signInWithCredentialsSchema } from "./validators";

export default {
  providers: [
    Github,
    Credentials({
      name: "Login with Credentials",
      type: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInWithCredentialsSchema.parseAsync(credentials);
          // Get user from database and verify the hashedPassword
          const user = await db.query.users.findFirst({
            where: eq(users.email, email),
          });
          // Validation checks
          if (!user || !user.hashedPassword) return null;
          if (!(await verifyPassword(user.hashedPassword, password))) return null;
          
          return {
            id: user.id, email: user.email, name: user.name,
          } satisfies User;

        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          id: token.id, email: token.email, name: token.name,
        },
      };
    },
    jwt: async ({ token }) => {
      const user = await db.query.users.findFirst({
        where: eq(users.email, token.email),
      });
      if (!user) {
        return token;
      }
      return {
        id: user.id, email: user.email, name: user.name,
      } as JWT;
    },
  }
} satisfies NextAuthConfig;
