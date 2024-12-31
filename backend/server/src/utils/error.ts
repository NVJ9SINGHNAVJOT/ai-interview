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
  // log internal server error
  if (error) {
    logger.error(message, { status: status, error: error });
  } else {
    logger.error(message, { status: status });
  }

  return res.status(status).json({
    success: false,
    message: message,
  });
}
