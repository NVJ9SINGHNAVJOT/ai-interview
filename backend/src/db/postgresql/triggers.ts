import { sql } from "drizzle-orm";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { logger } from "@/logger/logger";
import { pool } from "@/db/postgresql/connection";

// Function to set up PostgreSQL triggers globally
export async function setupPostgreSQLEventTrigger() {
  try {
    const db: NodePgDatabase = drizzle(pool);

    logger.info("setting up event trigger for automatic updated_at trigger...");

    // Create the function to update the updatedAt column if it exists
    await db.execute(
      sql.raw(`
            CREATE OR REPLACE FUNCTION update_updated_at_column()
            RETURNS TRIGGER AS $$
            BEGIN
                IF NEW.updated_at IS NOT NULL THEN
                    NEW.updated_at = NOW();
                END IF;
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `)
    );

    // Event trigger function that checks for 'updated_at' column and sets the trigger if it doesn't exist
    await db.execute(
      sql.raw(`
            CREATE OR REPLACE FUNCTION set_updated_at_trigger()
            RETURNS event_trigger AS $$
            DECLARE
                rec RECORD;
                trigger_exists BOOLEAN;
            BEGIN
                FOR rec IN 
                    SELECT tablename 
                    FROM pg_tables 
                    WHERE schemaname = 'public' 
                LOOP
                    -- Check if the table has an 'updated_at' column
                    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = rec.tablename AND column_name = 'updated_at') THEN
                        -- Check if the trigger already exists
                        SELECT EXISTS (
                            SELECT 1 FROM pg_trigger 
                            WHERE tgname = format('update_%I_updated_at', rec.tablename)
                        ) INTO trigger_exists;

                        -- Create the trigger only if it doesn't exist
                        IF NOT trigger_exists THEN
                            EXECUTE format('
                                CREATE OR REPLACE TRIGGER update_%I_updated_at
                                BEFORE UPDATE ON %I
                                FOR EACH ROW
                                EXECUTE FUNCTION update_updated_at_column();
                            ', rec.tablename, rec.tablename);
                        END IF;
                    END IF;
                END LOOP;
            END;
            $$ LANGUAGE plpgsql;
        `)
    );

    // Create an event trigger for when a table is created
    await db.execute(
      sql.raw(`
            CREATE OR REPLACE EVENT TRIGGER auto_set_updated_at_trigger
            ON ddl_command_end
            WHEN TAG IN ('CREATE TABLE', 'ALTER TABLE')
            EXECUTE FUNCTION set_updated_at_trigger();
        `)
    );

    logger.info("event trigger setup complete, exiting...");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    logger.error("event trigger setup failed for postgresql", { error: error.message });
    await pool.end();
    process.exit();
  }
}
