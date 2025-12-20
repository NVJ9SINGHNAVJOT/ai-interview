import { db } from "@/db/postgresql/connection";
import { query } from "@/db/postgresql/schema/querys";
import { createQueryReqSchema } from "@/types/controllers/queryReq";
import { errRes, internalErrRes } from "@/utils/error";
import { Request, Response } from "express";

export const createQuery = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { data, success, error } = createQueryReqSchema.safeParse(req.body);
    if (!success) {
      return errRes(req, res, 400, "Invalid data", error.toString());
    }

    // insert new query in database
    await db
      .insert(query)
      .values({ emailId: data.emailId, fullName: data.fullName, queryText: data.queryText })
      .execute();
    return res.status(210).json({ message: "Query submitted" });
  } catch (error) {
    return internalErrRes(req, res, "createQuery", error);
  }
};
