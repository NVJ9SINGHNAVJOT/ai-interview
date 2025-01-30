import { logger } from "@/logger/logger";

export const getErrorDetails = (error: unknown) => {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack || "unknown",
      cause: error.cause || "unknown",
    };
  }
  return "Unknown";
};

export const logError = (message: string, error: unknown) => {
  if (error instanceof Error) {
    logger.error(message, {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack || "unknown",
        cause: error.cause || "unknown",
      },
    });
  } else {
    logger.error(message, {
      error: "Unknown",
    });
  }
};
