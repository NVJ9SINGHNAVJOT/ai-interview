import { db } from "@/db/postgresql/connection";
import { user } from "@/db/postgresql/schema/user";
import { redisClient } from "@/db/redis/connection";
import { logger } from "@/logger/logger";
import { SendOtpReqSchema } from "@/types/controllers/authReq";
import { errRes, internalErrRes } from "@/utils/error";
import { generateOTP } from "@/utils/otp";
import { verifyEmail } from "@/utils/verifyEmail";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";

export const sendOtp = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { data, success, error } = SendOtpReqSchema.safeParse(req.body);
    if (!success) {
      return errRes(res, 400, "Invalid data", error.toString());
    }

    // send otp for user sign up
    if (data.type === "signup") {
      // check if use already present
      const checkUserAlreadyExist = await db
        .select({ id: user.id })
        .from(user)
        .where(eq(user.mailId, data.email))
        .limit(1)
        .execute();

      if (checkUserAlreadyExist.length !== 0) {
        return errRes(res, 400, "Invalid credentials");
      }

      // For now only gmail id is accepted as valid mail id
      const result = verifyEmail(data.email);

      if (!result) {
        return errRes(res, 400, "Invalid email id");
      }

      // create otp and save with email id in redis
      await redisClient.setex(`otp:signup:${data.email}`, 300, generateOTP());
      return res.status(200).json({
        message: "Verification otp sent",
      });
    }

    // send otp for user log in
    await redisClient.setex(`otp:login:${data.email}`, 300, generateOTP());
    return res.status(200).json({
      message: "Login otp sent",
    });
  } catch (error: any) {
    return internalErrRes(res, "sendOtp", error?.message || "Unknown error");
  }
};

export const signUp = async (req: Request, res: Response): Promise<Response> => {
  logger.debug("TODO: in progress", { req: req.body });
  return res.status(500).json({ todo: "todo" });
};

export const logIn = async (req: Request, res: Response): Promise<Response> => {
  logger.debug("TODO: in progress", { req: req.body });
  return res.status(500).json({ todo: "todo" });
};
