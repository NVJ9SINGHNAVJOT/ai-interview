import { configDotenv } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { logger } from "@/logger/logger";
import { user } from "@/db/postgresql/schema/user";
import { interview } from "@/db/postgresql/schema/interview";
import { interviewResult, interviewResultRelations } from "@/db/postgresql/schema/interviewResult";
import { mcq } from "@/db/postgresql/schema/mcq";
import { mcqResult, mcqResultRelations } from "@/db/postgresql/schema/mcqResult";
import { logError } from "@/logger/error";

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
  } catch (error) {
    logError("Error while connecting PostgreSQL database", error);
    process.exit(1);
  }
}

export async function postgresqlDatabaseDisconnect() {
  try {
    await pool.end();
    logger.info("PostgreSQL database disconnected");
  } catch (error) {
    logError("Error during PostgreSQL disconnection", error);
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
