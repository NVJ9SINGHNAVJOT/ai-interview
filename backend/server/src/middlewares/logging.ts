import { logger } from "@/logger/logger";
import { internalErrRes } from "@/utils/error";
import { NextFunction, Request, Response } from "express";

function logging(req: Request, res: Response, next: NextFunction) {
  try {
    // NOTE: This data logging can be shifted to kafka from server terminal
    logger.http("Request details", {
      method: req.method,
      url: req.url,
      clientIP: req.ip,
      query: req.query,
      requestBody: req.body,
      requestHeaders: {
        "sec-ch-ua-platform": req.headers["sec-ch-ua-platform"],
        origin: req.headers["origin"],
        "sec-fetch-site": req.headers["sec-fetch-site"],
        "sec-fetch-mode": req.headers["sec-fetch-mode"],
      },
    });
    next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return internalErrRes(res, "logging", error?.message || "Unknown error");
  }
}

export default logging;
