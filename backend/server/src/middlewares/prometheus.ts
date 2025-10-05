import { requestCounter, responseTimeHistogram } from "@/config/prometheus";
import { Request, Response, NextFunction } from "express";

const prometheus = (req: Request, res: Response, next: NextFunction) => {
  const end = responseTimeHistogram.startTimer({ method: req.method, route: req.path });

  res.on("finish", () => {
    const status = res.statusCode.toString(); // get status code as string
    requestCounter.inc({ method: req.method, route: req.path, status });
    end({ method: req.method, route: req.path, status });
  });

  next();
};

export default prometheus;
