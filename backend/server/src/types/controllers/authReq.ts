import { emailSchema, nameSchema, otpSchema } from "@/validators/zod";
import { z } from "zod";

export const SendOtpReqSchema = z.object({
  emailId: emailSchema,
  type: z.enum(["signup", "login"]),
});

export const signUpReqSchema = z.object({
  emailId: emailSchema,
  firstName: nameSchema,
  lastName: nameSchema,
  otp: otpSchema,
});

export const logInReqSchema = z.object({
  emailId: emailSchema,
  otp: otpSchema,
});
