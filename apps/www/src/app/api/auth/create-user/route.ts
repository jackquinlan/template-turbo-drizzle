import type { NextRequest } from "next/server";
import { ZodError } from "zod";

import { hashPassword } from "@repo/auth/crypto";
import { signUpWithCredentialsSchema } from "@repo/auth/validators";
import { db } from "@repo/database";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const body = signUpWithCredentialsSchema.parse(json);
    // Check if the user already exists
    const user = await db.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (user) {
      return new Response("User already exists", {
        status: 409,
      });
    }
    await db.user.create({
      data: {
        email: body.email,
        name:  body.name,
        hashedPassword: await hashPassword(body.password),
      }
    });
    return new Response(null, {
      status: 200,
    });
  } catch (error) {
    // Error parsing the request body
    if (error instanceof ZodError) {
      return new Response(JSON.stringify(error.message), {
        status: 422,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}