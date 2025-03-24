import { emailSchema, otpSchema } from "@/validators/zod";
import z from "zod";

export const otpReqSchema = z.object({
  emailId: emailSchema,
  type: z.enum(["signup", "login"]),
});

export const logInReqSchema = z.object({
  emailId: emailSchema,
  otp: otpSchema,
});
