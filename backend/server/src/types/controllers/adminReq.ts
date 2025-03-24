import { emailSchema, nameSchema, otpSchema } from "@/validators/zod";
import z from "zod";

export const adminSignupReqSchema = z.object({
  emailId: emailSchema,
  otp: otpSchema,
});
