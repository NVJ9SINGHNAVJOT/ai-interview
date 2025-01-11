import { errRes, internalErrRes } from "@/utils/error";
import { NextFunction, Request, Response } from "express";

function serverKey(req: Request, res: Response, next: NextFunction) {
  try {
    const serverKey = req.header("Authorization")?.replace("Bearer ", "");
    if (serverKey === `${process.env["SERVER_KEY"]}`) {
      next();
    } else {
      return errRes(req, res, 403, "Unauthorized access denied for server", {
        ip: req.ip,
        serverKey: serverKey,
      });
    }
  } catch (error) {
    return internalErrRes(req, res, "serverKey", error);
  }
}

export default serverKey;
