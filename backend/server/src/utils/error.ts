import { logger } from "@/logger/logger";
import { CustomRequest } from "@/types/custom";
import { Request, Response } from "express";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function errRes(
  req: Request,
  res: Response,
  status: number,
  message: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any
): Response<unknown, Record<string, unknown>> {
  // log error
  if (error) {
    logger.error(message, { requestId: (req as CustomRequest).requestId || "Unknown", status: status, error: error });
  } else {
    logger.error(message, { requestId: (req as CustomRequest).requestId || "Unknown", status: status });
  }

  return res.status(status).json({
    message: message,
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function internalErrRes(
  req: Request,
  res: Response,
  api: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
): Response<unknown, Record<string, unknown>> {
  // log internal server error
  logger.error(`Internal server error: ${api}`, {
    requestId: (req as CustomRequest).requestId || "Unknown",
    status: 500,
    error: error,
  });

  return res.status(500).json({
    message: "Internal server error",
  });
}
