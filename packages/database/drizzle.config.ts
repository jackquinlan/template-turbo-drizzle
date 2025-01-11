import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  out: "./drizzle",
  schema: "./src/schema/index.ts",
  strict: true,
  dbCredentials: {
    authToken: process.env.TURSO_AUTH_TOKEN!,
    url: process.env.TURSO_DATABASE_URL!,
  },
  dialect: "turso",
} satisfies Config;
