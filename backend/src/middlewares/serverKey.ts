import { errRes } from "@/utils/error";
import { NextFunction, Request, Response } from "express";

function serverKey(req: Request, res: Response, next: NextFunction) {
  try {
    const serverKey = req.header("Authorization")?.replace("Bearer ", "");
    if (serverKey === `${process.env["SERVER_KEY"]}`) {
      next();
    } else {
      return errRes(res, 403, "unauthorized access denied for server", { ip: req.ip, serverKey: serverKey });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return errRes(res, 500, "errror while checking authorization of serverKey", error.message);
  }
}

export default serverKey;
