import { db } from "@/db/postgresql/connection";
import { user } from "@/db/postgresql/schema/user";
import { redisClient } from "@/db/redis/connection";
import { logger } from "@/logger/logger";
import { SendOtpReqSchema, signUpReqSchema } from "@/types/controllers/authReq";
import { errRes, internalErrRes } from "@/utils/error";
import { generateOTP } from "@/utils/otp";
import { sendValidationMail, sendVerficationMail, verifyEmail } from "@/utils/email";
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
    // check if use already present
    const checkUserAlreadyExist = await db
      .select({ id: user.id })
      .from(user)
      .where(eq(user.emailId, data.email))
      .limit(1)
      .execute();

    // if type is signup then send otp for user sign up
    if (data.type === "signup") {
      if (checkUserAlreadyExist.length !== 0) {
        return errRes(res, 400, "Invalid credentials");
      }

      // create otp and save with email id in redis
      const newOtp = generateOTP();
      await redisClient.setex(`otp:signup:${data.email}`, 300, newOtp);
      const mailSent = await sendVerficationMail(data.email, newOtp);
      if (!mailSent) {
        return internalErrRes(res, "sentOtp", "Failed to send verification otp email");
      }
      return res.status(200).json({
        message: "Check your email for verification otp",
      });
    }

    // type is login then send otp for user log in
    if (checkUserAlreadyExist.length !== 1) {
      return errRes(res, 400, "Invalid credentials");
    }
    const newOtp = generateOTP();
    await redisClient.setex(`otp:login:${data.email}`, 300, newOtp);
    const mailSent = await sendValidationMail(data.email, newOtp);
    if (!mailSent) {
      return internalErrRes(res, "sentOtp", "Failed to send validation otp email");
    }
    return res.status(200).json({
      message: "Check your email for validation otp",
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
      return errRes(res, 400, "Invalid credentials");
    }

    return res.status(201).json({
      message: "Sign up completed",
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
