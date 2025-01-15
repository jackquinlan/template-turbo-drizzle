import { drizzle } from "drizzle-orm/libsql/http";
import * as schema from "./schema";

export const db = drizzle({
  connection: {
    authToken: process.env.TURSO_AUTH_TOKEN!,
    url: process.env.TURSO_DATABASE_URL!,
  },
  schema: schema,
});
