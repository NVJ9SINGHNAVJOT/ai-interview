import { configDotenv } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { logger } from "@/logger/logger";
import { user } from "@/db/postgresql/schema/user";
import { interview } from "@/db/postgresql/schema/interview";
import { interviewResult, interviewResultRelations } from "@/db/postgresql/schema/interviewResult";
import { mcq } from "@/db/postgresql/schema/mcq";
import { mcqResult, mcqResultRelations } from "@/db/postgresql/schema/mcqResult";

configDotenv();

export const pool = new Pool({
  host: `${process.env["POSTGRES_HOST"]}`,
  user: `${process.env["POSTGRES_USER"]}`,
  database: `${process.env["POSTGRES_DB"]}`,
  password: `${process.env["POSTGRES_PASSWORD"]}`,
  /* INFO: only use for live connections */
  // ssl: { rejectUnauthorized: false },
});

export async function postgresqlDatabaseConnect() {
  try {
    await pool.connect();
    logger.info("PostgreSQL database connected");
  } catch (error: any) {
    logger.error("Error while connecting PostgreSQL database", { error: error?.message || "Unknown error" });
    process.exit(1);
  }
}

export async function postgresqlDatabaseDisconnect() {
  try {
    await pool.end();
    logger.info("PostgreSQL database disconnected");
  } catch (error: any) {
    logger.error("Error during PostgreSQL disconnection", { error: error?.message || "Unknown error" });
  }
}

export const db = drizzle(pool, {
  schema: {
    user,
    interview,
    interviewResult,
    interviewResultRelations,
    mcq,
    mcqResult,
    mcqResultRelations,
  },
});
