import { Request } from "express";
declare global {
  namespace Express {
    interface Request {
      requestId: string;
      // CAUTION: Only to be accessed after auth middleware used in route
      userId: number;
    }
  }
}
