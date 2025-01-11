import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle } from "drizzle-orm/node-postgres";
import { logger } from "@/logger/logger";
import { pool } from "@/db/postgresql/connection";
import { logError } from "@/logger/error";

export async function migratePostgreSQL() {
  try {
    const db = drizzle(pool);

    logger.info("Running migrations...");
    await migrate(db, { migrationsFolder: "src/db/postgresql/migrations" });

    logger.info("All migrations have been done, exiting...");
  } catch (error) {
    logError("Error while PostgreSQL migration", error);
    process.exit(1);
  }
}
