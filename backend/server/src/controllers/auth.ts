import { db } from "@/db/postgresql/connection";
import { user } from "@/db/postgresql/schema/user";
import { redisClient } from "@/db/redis/connection";
import { logger } from "@/logger/logger";
import { SendOtpReqSchema, signUpReqSchema } from "@/types/controllers/authReq";
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

    // For now only gmail id is accepted as valid mail id
    const result = verifyEmail(data.email);
    if (!result) {
      return errRes(res, 400, "Invalid email id");
    }

    // if type is signup then send otp for user sign up
    if (data.type === "signup") {
      // check if use already present
      const checkUserAlreadyExist = await db
        .select({ id: user.id })
        .from(user)
        .where(eq(user.emailId, data.email))
        .limit(1)
        .execute();

      if (checkUserAlreadyExist.length !== 0) {
        return errRes(res, 400, "Invalid credentials");
      }

      // create otp and save with email id in redis
      await redisClient.setex(`otp:signup:${data.email}`, 300, generateOTP());
      return res.status(200).json({
        message: "Verification otp sent",
      });
    }

    // type is login then send otp for user log in
    await redisClient.setex(`otp:login:${data.email}`, 300, generateOTP());
    return res.status(200).json({
      message: "Login otp sent",
    });
  } catch (error: any) {
    return internalErrRes(res, "sendOtp", error?.message || "Unknown error");
  }
};

export const signUp = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { data, success, error } = signUpReqSchema.safeParse(req.body);

    if (!success) {
      return errRes(res, 400, "Invalid data", error.toString());
    }

    const signUpOtp = await redisClient.get(`otp:signup:${data.email}`);

    if (!signUpOtp) {
      return errRes(res, 400, "Otp expired");
    }
    if (signUpOtp !== data.otp) {
      return errRes(res, 400, "Invalid otp");
    }

    // otp verification is done and now create user
    const newUser = await db
      .insert(user)
      .values({ firstName: data.firstName, lastName: data.lastName, emailId: data.email })
      .onConflictDoNothing({ target: user.emailId })
      .returning({ id: user.id, firstName: user.firstName, lastName: user.lastName, emailId: user.emailId })
      .execute();

    if (newUser.length === 0) {
      return errRes(res, 400, "User already exist");
    }

    return res.status(201).json({
      message: "User sign up completed",
      data: newUser[0],
    });
  } catch (error: any) {
    return internalErrRes(res, "signUp", error?.message || "Unknown error");
  }
};

export const logIn = async (req: Request, res: Response): Promise<Response> => {
  logger.debug("TODO: in progress", { req: req.body });
  return res.status(500).json({ todo: "todo" });
};
