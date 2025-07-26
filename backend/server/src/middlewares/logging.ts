import { logger } from "@/logger/logger";
import { CustomRequest } from "@/types/custom";
import { internalErrRes } from "@/utils/error";
import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

function logging(req: Request, res: Response, next: NextFunction) {
  try {
    (req as CustomRequest).requestId = uuidv4(); // Attach a request id to the request object

    // NOTE: This data logging can be shifted to kafka from server terminal
    logger.http("Request details", {
      requestId: (req as CustomRequest).requestId,
      method: req.method,
      url: req.url,
      clientIP: req.ip,
      query: req.query,
      requestBody: req.body,
      token: req.cookies[`${process.env["TOKEN_NAME"]}`] || "",
      requestHeaders: {
        content: req.headers["content-type"],
        "sec-ch-ua-platform": req.headers["sec-ch-ua-platform"],
        origin: req.headers["origin"],
        "sec-fetch-site": req.headers["sec-fetch-site"],
        "sec-fetch-mode": req.headers["sec-fetch-mode"],
      },
    });
    next();
  } catch (error) {
    return internalErrRes(req, res, "logging", error);
  }
}

export default logging;
