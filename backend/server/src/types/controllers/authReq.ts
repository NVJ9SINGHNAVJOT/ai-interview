import { nameSchema, otpSchema } from "@/validators/zod";
import { z } from "zod";

export const SendOtpReqSchema = z.object({
  email: z.string().email(),
  type: z.enum(["signup", "login"]),
});

export const signUpReqSchema = z.object({
  email: z.string().email(),
  firstName: nameSchema,
  lastName: nameSchema,
  otp: otpSchema,
});
