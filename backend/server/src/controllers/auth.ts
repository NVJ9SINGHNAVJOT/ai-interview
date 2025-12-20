import { db } from "@/db/postgresql/connection";
import { users } from "@/db/postgresql/schema/users";
import { redisClient } from "@/db/redis/connection";
import { signUpReqSchema } from "@/types/controllers/authReq";
import { errRes, internalErrRes } from "@/utils/error";
import { generateOTP } from "@/utils/otp";
import { sendValidationMail, sendVerficationMail, verifyEmail } from "@/utils/email";
import { eq } from "drizzle-orm";
import { CookieOptions, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtVerify } from "@/utils/token";
import { otpReqSchema, logInReqSchema } from "@/types/controllers/common";

const fiveDaysInSeconds = 5 * 24 * 60 * 60; // 5 days in seconds
const fiveDaysInMilliseconds = 5 * 24 * 60 * 60 * 1000; // 5 days in ms

// set token in cookie and select httponly: true
const cookieOptions: CookieOptions = {
  expires: new Date(Date.now() + fiveDaysInMilliseconds),
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

export const sendOtp = async (req: Request, res: Response): Promise<Response> => {
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
    // Check if use already present
    const checkUserAlreadyExist = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.emailId, data.emailId))
      .limit(1)
      .execute();

    // If type is signup then send otp for user sign up
    if (data.type === "signup") {
      if (checkUserAlreadyExist.length !== 0) {
        return errRes(req, res, 400, "Invalid credentials");
      }

      // Create otp and save with email id in redis
      const newOtp = generateOTP();
      await redisClient.setex(`user:otp:signup:${data.emailId}`, 300, newOtp);
      const mailSent = await sendVerficationMail(data.emailId, newOtp);
      if (!mailSent) {
        return internalErrRes(req, res, "sentOtp", "Failed to send verification otp email");
      }
      return res.status(200).json({
        message: "Check your email for verification otp",
      });
    }

    // type is login then send otp for user log in
    if (checkUserAlreadyExist.length !== 1) {
      return errRes(req, res, 400, "Invalid credentials");
    }
    const newOtp = generateOTP();
    await redisClient.setex(`user:otp:login:${data.emailId}`, 300, newOtp);
    const mailSent = await sendValidationMail(data.emailId, newOtp);
    if (!mailSent) {
      return internalErrRes(req, res, "sentOtp", "Failed to send validation otp email");
    }
    return res.status(200).json({
      message: "Check your email for validation otp",
    });
  } catch (error) {
    return internalErrRes(req, res, "sendOtp", error);
  }
};

export const signUp = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { data, success, error } = signUpReqSchema.safeParse(req.body);

    if (!success) {
      return errRes(req, res, 400, "Invalid data", error.toString());
    }

    // Check otp in redis
    const signUpOtp = await redisClient.get(`user:otp:signup:${data.emailId}`);

    if (!signUpOtp) {
      return errRes(req, res, 400, "Otp expired");
    }
    if (signUpOtp !== data.otp) {
      return errRes(req, res, 400, "Invalid otp");
    }

    // Otp verification is done and now create user
    const newUser = await db
      .insert(users)
      .values({ firstName: data.firstName, lastName: data.lastName, emailId: data.emailId })
      .onConflictDoNothing({ target: users.emailId })
      .returning({ id: users.id })
      .execute();

    // User already present for email
    if (newUser.length === 0) {
      return errRes(req, res, 400, "Invalid credentials");
    }

    // Create token
    const newToken = jwt.sign({ id: newUser[0].id }, `${process.env["JWT_SECRET"]}`);

    // Save token in redis
    await redisClient.setex(`user:token:${newUser[0].id}:${newToken}`, fiveDaysInSeconds, "valid");

    return res.cookie(`${process.env["TOKEN_NAME"]}`, newToken, cookieOptions).status(201).json({
      message: "Sign up completed",
      data: newUser[0],
    });
  } catch (error) {
    return internalErrRes(req, res, "signUp", error);
  }
};

export const logIn = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { data, error, success } = logInReqSchema.safeParse(req.body);

    if (!success) {
      return errRes(req, res, 400, "Invalid data", error.toString());
    }

    // Check otp in redis
    const logInOtp = await redisClient.get(`user:otp:login:${data.emailId}`);
    if (!logInOtp) {
      return errRes(req, res, 400, "Otp expired");
    }
    if (data.otp !== logInOtp) {
      return errRes(req, res, 400, "Invalid otp");
    }

    // Otp verification is done and now check user email id,
    // send user data in response
    const userData = await db
      .select({ id: users.id, firstName: users.firstName, lastName: users.lastName })
      .from(users)
      .where(eq(users.emailId, data.emailId))
      .limit(1)
      .execute();

    if (userData.length !== 1) {
      return errRes(req, res, 400, "Invalid credentials");
    }

    // Create token
    const newToken = jwt.sign({ id: userData[0].id }, `${process.env["JWT_SECRET"]}`);

    // Save token in redis
    await redisClient.setex(`user:token:${userData[0].id}:${newToken}`, fiveDaysInSeconds, "valid");

    return res
      .cookie(`${process.env["TOKEN_NAME"]}`, newToken, cookieOptions)
      .status(200)
      .json({
        message: "Login completed!",
        data: { user: userData[0] },
      });
  } catch (error) {
    return internalErrRes(req, res, "logIn", error);
  }
};

export const checkUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Extracting JWT from request cookies
    const token = req.cookies[`${process.env["TOKEN_NAME"]}`];

    if (!token) {
      return res.status(200).json({
        message: "Token not present",
      });
    }

    const id = jwtVerify(token);

    // Check token present in redis or not
    const valid = await redisClient.get(`user:token:${id}:${token}`);
    if (!valid) {
      return errRes(req, res, 401, "Token expired");
    }
    if (valid !== "valid") {
      return errRes(req, res, 401, "Invalid token");
    }

    // Otp verification is done and now check user email id,
    // send user data in response
    const userData = await db
      .select({ id: users.id, firstName: users.firstName, lastName: users.lastName, emailId: users.emailId })
      .from(users)
      .where(eq(users.id, id))
      .limit(1)
      .execute();

    if (userData.length !== 1) {
      return errRes(req, res, 400, "Invalid data");
    }

    // Update expiry in redis for token
    await redisClient.setex(`user:token:${userData[0].id}:${token}`, fiveDaysInSeconds, "valid");

    // Update expiry in cookies for token
    return res
      .cookie(`${process.env["TOKEN_NAME"]}`, token, cookieOptions)
      .status(200)
      .json({
        message: "User checked",
        data: { user: userData[0] },
      });
  } catch (error) {
    return internalErrRes(req, res, "checkUser", error);
  }
};
