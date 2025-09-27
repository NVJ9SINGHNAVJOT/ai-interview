import { logger } from "@/logger/logger";
import { CustomRequest } from "@/types/custom";
import { Request, Response } from "express";

function getRequestId(req: Request): string {
  return (req as CustomRequest).requestId || "Unknown";
}

export function errRes(req: Request, res: Response, status: number, message: string, error?: unknown): Response {
  logger.error(message, {
    requestId: getRequestId(req),
    status,
    error: error ?? undefined,
  });

  return res.status(status).json({ message });
}

export function internalErrRes(req: Request, res: Response, api: string, error: unknown): Response {
  const requestId = getRequestId(req);

  const errorPayload =
    error instanceof Error
      ? {
          name: error.name,
          message: error.message,
          stack: error.stack ?? "unknown",
          cause: error.cause ?? "unknown",
        }
      : String(error);

  logger.error(`Internal server error: ${api}`, {
    requestId,
    status: 500,
    error: errorPayload,
  });

  return res.status(500).json({ message: "Internal server error" });
}
