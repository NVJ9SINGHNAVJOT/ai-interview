import { logger } from "@/logger/logger";
import { Request, Response } from "express";

export const createMcq = async (req: Request, res: Response): Promise<Response> => {
  logger.debug("TODO: in progress", { req: req.body });
  return res.status(500).json({ todo: "todo" });
};
