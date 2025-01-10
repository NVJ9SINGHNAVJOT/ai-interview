import { emailSchema, nameSchema, otpSchema } from "@/validators/zod";
import { z } from "zod";

export const SendOtpReqSchema = z.object({
  email: emailSchema,
  type: z.enum(["signup", "login"]),
});

export const signUpReqSchema = z.object({
  email: emailSchema,
  firstName: nameSchema,
  lastName: nameSchema,
  otp: otpSchema,
});
