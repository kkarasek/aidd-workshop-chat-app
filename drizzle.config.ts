import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config(); // Now loads .env by default

export default {
  schema: "./server/db/schema.ts",
  out: "./server/db/migrations",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.NUXT_DATABASE_URL!,
  },
} satisfies Config; 