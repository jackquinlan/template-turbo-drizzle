import type { NextAuthConfig } from "next-auth";
import type { JWT } from "next-auth/jwt";
import Credentials from "@auth/core/providers/credentials";
import Github from "next-auth/providers/github";
import { db } from "@repo/database";
import { verifyPassword } from "./crypto";
import { signInWithCredentialsSchema } from "./validators";

export default { 
  providers: [
    Github,
    Credentials({
      name: "Login with Credentials",
      type: "credentials",
      credentials: {
        email: {}, password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInWithCredentialsSchema.parseAsync(credentials);
          // Get user from database and verify the hashedPassword
          const user = await db.user.findUnique({
            where: { email: email },
          });
          if (!user || !user.hashedPassword) {
            throw new Error("No user found");
          }
          if (!await verifyPassword(user.hashedPassword, password)) {
            throw new Error("Invalid email or password");
          }
          return {
            id: user.id, email: user.email, name: user.name
          }; 
        } catch (error) {
          return null;
        }
      }
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
      const dbUser = await db.user.findUnique({
        where: { email: token.email },
      });
      if (!dbUser) {
        return token;
      }
      return {
        id: dbUser.id, email: dbUser.email, name: dbUser.name,
      } as JWT;
    },
  },
} satisfies NextAuthConfig;
