import { sql } from "drizzle-orm";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { logger } from "@/logger/logger";
import { pool } from "@/db/postgresql/connection";

const tables = ["user", "mcq", "mcq_result", "interview", "interview_result"];

// Function to set up PostgreSQL triggers globally
export async function setupPostgreSQLEventTrigger() {
  try {
    const db: NodePgDatabase = drizzle(pool);

    logger.info("Setting up event trigger for automatic updated_at trigger...");

    // Create the function to update the updatedAt column if it doesn't exist
    await db.execute(
      sql.raw(`
              CREATE OR REPLACE FUNCTION update_updated_at_column()
              RETURNS TRIGGER AS $$
              BEGIN
                  NEW.updated_at = NOW();
                  RETURN NEW;
              END;
              $$ LANGUAGE plpgsql;
          `)
    );

    // Loop through each table and create a trigger
    for (const table of tables) {
      await db.execute(
        sql.raw(`
                  CREATE OR REPLACE TRIGGER update_${table}_updated_at
                  BEFORE UPDATE ON "${table}"
                  FOR EACH ROW
                  EXECUTE FUNCTION update_updated_at_column();
              `)
      );
    }

    logger.info("event trigger setup complete, exiting...");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    logger.error("Event trigger setup failed for postgresql", { error: error.message });
    await pool.end();
    process.exit();
  }
}
