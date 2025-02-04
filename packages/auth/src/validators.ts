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

export const updatePasswordSchema = z
  .object({
    password: z.string().min(8),
    passwordConfirmation: z.string().min(8),
    token: z.string().min(1),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords must match",
    path: ["passwordConfirmation"],
  });

export const updateEmailSchema = z.object({
  newEmail: z.string().email(),
  userId: z.string().uuid(),
});

export const updateProfileSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
});

export const deleteAccountSchema = z.object({
  id: z.string().uuid(),
});
