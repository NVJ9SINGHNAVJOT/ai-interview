import { logger } from "@/logger/logger";
import { errRes } from "@/utils/error";
import { NextFunction, Request, Response } from "express";

function logging(req: Request, res: Response, next: NextFunction) {
  try {
    const toBeLogged = req.url.split("/").pop();

    logger.http("req details", {
      method: req.method,
      url: req.url,
      clientIP: req.ip,
      query: req.query,
      requestBody:
        toBeLogged === "login"
          ? { email: req.body.email }
          : toBeLogged === "changePassword"
            ? {}
            : toBeLogged === "resetPassword"
              ? { email: req.body.email, otp: req.body.otp }
              : req.body,
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
    return errRes(res, 500, "errror while logging req details", error.message);
  }
}

export default logging;
