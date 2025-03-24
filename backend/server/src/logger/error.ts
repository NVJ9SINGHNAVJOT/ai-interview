import { logger } from "@/logger/logger";

const extractErrorDetails = (error: unknown) =>
  error instanceof Error
    ? {
        name: error.name,
        message: error.message,
        stack: error.stack || "unknown",
        cause: error.cause || "unknown",
      }
    : "Unknown";

export const getErrorDetails = extractErrorDetails;

export const logError = (message: string, error: unknown) => {
  logger.error(message, { error: extractErrorDetails(error) });
};
