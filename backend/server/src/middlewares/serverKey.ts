import { errRes, internalErrRes } from "@/utils/error";
import { NextFunction, Request, Response } from "express";

function serverKey(req: Request, res: Response, next: NextFunction) {
  try {
    const serverKey = req.header("Authorization")?.replace("Bearer ", "");
    if (serverKey === process.env["SERVER_KEY"]) {
      next();
    } else {
      return errRes(res, 403, "Unauthorized access denied for server", { ip: req.ip, serverKey: serverKey });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return internalErrRes(res, "serverKey", error?.message || "Unknown error");
  }
}

export default serverKey;
