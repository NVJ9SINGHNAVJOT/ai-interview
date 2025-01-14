import { logger } from "@/logger/logger";
import { createQueryReqSchema } from "@/types/controllers/queryReq";
import { errRes } from "@/utils/error";
import { Request, Response } from "express";

export const createQuery = async (req: Request, res: Response): Promise<Response> => {
  logger.debug("TODO: in progress", { req: req.body });
  const { data, success, error } = createQueryReqSchema.safeParse(req.body);
  if (!success) {
    return errRes(req, res, 400, "Invalid data", error.toString());
  }
  logger.debug("data", data);
  return res.status(500).json({ todo: "todo" });
};
