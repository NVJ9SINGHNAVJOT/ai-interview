import { configDotenv } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { logger } from "@/logger/logger";
import { envs } from "@/config/envs";

configDotenv();

export const pool = new Pool({
  host: envs.POSTGRES_HOST,
  user: envs.POSTGRES_USER,
  database: envs.POSTGRES_DB,
  password: envs.POSTGRES_PASSWORD,
  /* INFO: only use for live connections */
  // ssl: { rejectUnauthorized: false },
});

export async function postgresqlDatabaseConnect() {
  try {
    await pool.connect();
    logger.info("postgresql database connected");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    logger.error("error while connecting postgresql database", { error: error.message });
    await pool.end();
    process.exit();
  }
}

export async function postgresqlDatabaseDisconnect() {
  await pool.end();
  logger.info("postgresql database disconnected");
}

export const db = drizzle(pool, {
  schema: {},
});
