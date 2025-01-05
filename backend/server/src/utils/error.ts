import { logger } from "@/logger/logger";
import { Response } from "express";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function errRes(
  res: Response,
  status: number,
  message: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any
): Response<unknown, Record<string, unknown>> {
  // log error
  if (error) {
    logger.error(message, { status: status, error: error });
  } else {
    logger.error(message, { status: status });
  }

  return res.status(status).json({
    message: message,
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function internalErrRes(
  res: Response,
  api: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
): Response<unknown, Record<string, unknown>> {
  // log internal server error
  logger.error(`internal server error: ${api}`, { status: 500, error: error });

  return res.status(500).json({
    message: "internal server error",
  });
}
