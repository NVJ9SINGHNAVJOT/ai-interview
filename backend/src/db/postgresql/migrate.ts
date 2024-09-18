import { migrate } from "drizzle-orm/node-postgres/migrator";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { logger } from "@/logger/logger";
import { pool } from "@/db/postgresql/connection";

export async function migratePostgreSQL() {
  try {
    const db: NodePgDatabase = drizzle(pool);

    logger.info("Running migrations...");
    await migrate(db, { migrationsFolder: "src/db/postgresql/migrations" });

    logger.info("All migrations have been done, exiting...");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    logger.error("error while postgresql migration", { error: error.message });
    await pool.end();
    process.exit();
  }
}
