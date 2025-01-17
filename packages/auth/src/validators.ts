import { z } from "zod";

export const signInWithCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }), // Don't want to limit on login
});

export const signUpWithCredentialsSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email(),
  password: z.string().min(8),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});
