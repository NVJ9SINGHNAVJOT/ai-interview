import type { Config } from "drizzle-kit";
import "dotenv/config";
import { configDotenv } from "dotenv";
configDotenv();

export default {
  schema: "./src/db/postgresql/schema/*",
  out: "./src/db/postgresql/migrations",
  driver: "pg",
  dbCredentials: {
    host: `${process.env["POSTGRES_HOST"]}`,
    user: `${process.env["POSTGRES_USER"]}`,
    database: `${process.env["POSTGRES_DB"]}`,
    password: `${process.env["POSTGRES_PASSWORD"]}`,
  },
  verbose: true,
  strict: true,
} satisfies Config;
