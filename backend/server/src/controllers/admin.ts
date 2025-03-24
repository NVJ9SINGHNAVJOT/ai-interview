import { db } from "@/db/postgresql/connection";
import { admin } from "@/db/postgresql/schema/admin";
import { redisClient } from "@/db/redis/connection";
import { logger } from "@/logger/logger";
import { adminSignupReqSchema } from "@/types/controllers/adminReq";
import { logInReqSchema, otpReqSchema } from "@/types/controllers/common";
import { verifyEmail, sendVerficationMail, sendValidationMail } from "@/utils/email";
import { errRes, internalErrRes } from "@/utils/error";
import { generateOTP } from "@/utils/otp";
import { eq } from "drizzle-orm";
import { CookieOptions, Request, Response } from "express";
import jwt from "jsonwebtoken";

const oneDaysInSeconds = 1 * 24 * 60 * 60; // 1 day in seconds
const oneDaysInMilliseconds = 1 * 24 * 60 * 60 * 1000; // 1 day in ms

// set token in cookie and select httponly: true
const cookieOptions: CookieOptions = {
  expires: new Date(Date.now() + oneDaysInMilliseconds),
  httpOnly: true,
  secure: true,
  sameSite: true,
};

export const adminOtp = async (req: Request, res: Response) => {
  try {
    const { data, success, error } = otpReqSchema.safeParse(req.body);
    if (!success) {
      return errRes(req, res, 400, "Invalid data", error.toString());
    }

    // For now only gmail id is accepted as valid mail id
    const result = verifyEmail(data.emailId);
    if (!result) {
      return errRes(req, res, 400, "Invalid email id");
    }
    // Check if admin already present, for now only one admin can be present
    const adminData = await db.select({ id: admin.id, emailId: admin.emailId }).from(admin).execute();

    // If type is signup then send otp for admin sign up
    if (data.type === "signup") {
      if (adminData.length !== 0) {
        return errRes(req, res, 400, "Invalid credentials");
      }

      // Create otp and save with email id in redis
      const newOtp = generateOTP();
      await redisClient.setex(`admin:otp:signup:${data.emailId}`, 300, newOtp);
      const mailSent = await sendVerficationMail(data.emailId, newOtp);
      if (!mailSent) {
        return internalErrRes(req, res, "adminOtp", "Failed to send verification otp email");
      }
      return res.status(200).json({
        message: "Check your email for verification otp",
      });
    }

    // type is login then send otp for admin log in
    if (adminData.length !== 1 || adminData[0].emailId !== data.emailId) {
      return errRes(req, res, 400, "Invalid credentials");
    }
    const newOtp = generateOTP();
    await redisClient.setex(`admin:otp:login:${data.emailId}`, 300, newOtp);
    const mailSent = await sendValidationMail(data.emailId, newOtp);
    if (!mailSent) {
      return internalErrRes(req, res, "adminOtp", "Failed to send validation otp email");
    }
    return res.status(200).json({
      message: "Check your email for validation otp",
    });
  } catch (error) {
    return internalErrRes(req, res, "adminOtp", error);
  }
};

export const adminSignup = async (req: Request, res: Response) => {
  try {
    const { data, success, error } = adminSignupReqSchema.safeParse(req.body);
    if (!success) {
      return errRes(req, res, 400, "Invlaid data", error.toString());
    }

    // Check otp in redis
    const signUpOtp = await redisClient.get(`admin:otp:signup:${data.emailId}`);

    if (!signUpOtp) {
      return errRes(req, res, 400, "Otp expired");
    }
    if (signUpOtp !== data.otp) {
      return errRes(req, res, 400, "Invalid otp");
    }

    const adminCreated = await db.transaction(async (tx) => {
      const adminData = await tx.select({ id: admin.id }).from(admin).execute();
      // INFO: Only one admin is allowed
      if (adminData.length !== 0) {
        return { success: false, id: 0 };
      }

      // Create admin
      const newAdmin = await tx.insert(admin).values({ emailId: data.emailId }).returning({ id: admin.id });
      return { success: true, id: newAdmin[0].id };
    });

    if (!adminCreated.success) {
      return errRes(req, res, 400, "Invalid credentials");
    }

    logger.info("Admin created");

    // Create token
    const newToken = jwt.sign({ id: adminCreated.id }, `${process.env["JWT_SECRET"]}`);

    // Save token in redis
    await redisClient.setex(`admin:token:${adminCreated.id}:${newToken}`, oneDaysInSeconds, "valid");

    return res
      .cookie(`${process.env["TOKEN_NAME"]}`, newToken, cookieOptions)
      .status(201)
      .json({
        message: "Admin created",
        data: { id: adminCreated.id },
      });
  } catch (error) {
    return internalErrRes(req, res, "adminSignup", error);
  }
};

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { data, error, success } = logInReqSchema.safeParse(req.body);

    if (!success) {
      return errRes(req, res, 400, "Invalid data", error.toString());
    }

    // Check otp in redis
    const logInOtp = await redisClient.get(`admin:otp:login:${data.emailId}`);
    if (!logInOtp) {
      return errRes(req, res, 400, "Otp expired");
    }
    if (data.otp !== logInOtp) {
      return errRes(req, res, 400, "Invalid otp");
    }

    // Otp verification is done and now check admin email id,
    // send admin data in response
    const adminData = await db
      .select({ id: admin.id })
      .from(admin)
      .where(eq(admin.emailId, data.emailId))
      .limit(1)
      .execute();

    if (adminData.length === 0) {
      return errRes(req, res, 400, "Invalid credentials");
    }

    // Create token
    const newToken = jwt.sign({ id: adminData[0].id }, `${process.env["JWT_SECRET"]}`);

    // Save token in redis
    await redisClient.setex(`admin:token:${adminData[0].id}:${newToken}`, oneDaysInSeconds, "valid");

    return res
      .cookie(`${process.env["TOKEN_NAME"]}`, newToken, cookieOptions)
      .status(200)
      .json({
        message: "Login completed!",
        data: { user: adminData[0] },
      });
  } catch (error) {
    return internalErrRes(req, res, "adminLogin", error);
  }
};
