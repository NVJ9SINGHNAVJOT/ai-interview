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

export function internalErrRes(
  req: Request,
  res: Response,
  api: string,
  error: unknown
): Response<unknown, Record<string, unknown>> {
  // log internal server error
  if (error instanceof Error) {
    logger.error(`Internal server error: ${api}`, {
      requestId: (req as CustomRequest).requestId || "Unknown",
      status: 500,
      error: {
        name: error.name,
        mesage: error.message,
        stack: error.stack || "unknown",
        cause: error.cause || "unknown",
      },
    });
  } else {
    logger.error(`Internal server error: ${api}`, {
      requestId: (req as CustomRequest).requestId || "Unknown",
      status: 500,
      error: "Unknown",
    });
  }

  return res.status(500).json({
    message: "Internal server error",
  });
}
