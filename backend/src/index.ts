// initialization environment for server
import { configDotenv } from "dotenv";
configDotenv();

// setup server config
import { logger, loggerConfig } from "@/logger/logger";
import app from "@/app/app";
import { postgresqlDatabaseConnect, postgresqlDatabaseDisconnect } from "@/db/postgresql/connection";
import { checkEnvVariables } from "@/validators/checkEnvVariables";
import { migratePostgreSQL } from "@/db/postgresql/migrate";
import { setupPostgreSQLEventTrigger } from "@/db/postgresql/triggers";
import { envs } from "@/config/envs";

async function handleExit() {
  await postgresqlDatabaseDisconnect();
}

async function main() {
  // check environment variables
  checkEnvVariables();
  // setup logger
  loggerConfig(envs.ENVIRONMENT);

  // connect database
  await postgresqlDatabaseConnect();

  // postgresql migrations and triggers
  /* NOTE: commented only for development purpose, remove comment in production */
  await migratePostgreSQL();
  await setupPostgreSQLEventTrigger();

  // get port number
  const PORT = parseInt(envs.PORT);

  // setup server
  const httpServer = app;

  process.on("SIGINT", () => handleExit());
  process.on("SIGTERM", () => handleExit());

  httpServer.listen(PORT, () => {
    logger.info("server running...");
  });
}

main();
