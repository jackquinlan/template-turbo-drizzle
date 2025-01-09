import type { Session, User } from "next-auth";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "@auth/core/providers/credentials";
import Github from "next-auth/providers/github";
import { db } from "@repo/database";
import { verifyPassword } from "./crypto";
import { signInWithCredentialsSchema } from "./validators";


export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
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
          console.log("here");
          return {
            id: user.id, email: user.email, name: user.name
          } satisfies User;
        } catch (error) {
          return null;
        }
      }
    }),
  ],
  callbacks: {},
});
