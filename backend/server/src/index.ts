import { configDotenv } from "dotenv";
configDotenv();

// setup server config
import { logger, loggerConfig } from "@/logger/logger";
import { checkEnvVariables } from "@/config/envs";
import { postgresqlDatabaseConnect, postgresqlDatabaseDisconnect } from "@/db/postgresql/connection";
import { migratePostgreSQL } from "@/db/postgresql/migrate";
import { setupPostgreSQLEventTrigger } from "@/db/postgresql/triggers";
import app from "@/app/app";
import http from "http";
import { connectToRedis, disconnectRedis } from "@/db/redis/connection";

// Flag to track server status
let isShuttingDown = false;

// Graceful shutdown handler
function handleExit(server: http.Server) {
  if (isShuttingDown) return;
  isShuttingDown = true;

  logger.info("Shutting down gracefully...");

  // Stop accepting new connections
  server.close(async (err) => {
    if (err) {
      logger.error("Error while closing the server", err);
      process.exit(1); // Force exit if error occurs
    }
    logger.info("Server stopped gracefully...");

    // Disconnect from redis
    disconnectRedis();

    // Disconnect from PostgreSQL
    // FIXME: postgres disconnection is not working
    // await postgresqlDatabaseDisconnect();

    logger.info("Shut down completed...");
    process.exit(0); // Exit cleanly
  });

  // Force exit if graceful shutdown takes too long (e.g., 10 seconds)
  setTimeout(() => {
    logger.warn("Forcing shutdown due to timeout.");
    process.exit(1);
  }, 10000); // 10 seconds
}

async function main() {
  // Check environment variables
  checkEnvVariables();

  // Setup logger
  loggerConfig(`${process.env["ENVIRONMENT"]}`);

  // Connect database
  await postgresqlDatabaseConnect();

  // PostgreSQL migrations and triggers
  /* NOTE: Commented only for development purposes, remove comment in production */
  await migratePostgreSQL();
  await setupPostgreSQLEventTrigger();

  // Connect to redis
  await connectToRedis();

  // Get port number
  const PORT = parseInt(`${process.env["PORT"]}`);

  // Setup server
  const httpServer = http.createServer(app);

  // Start server
  httpServer.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}...`);
  });

  // Gracefully handle termination signals
  process.on("SIGINT", () => handleExit(httpServer));
  process.on("SIGTERM", () => handleExit(httpServer));
}

main();
