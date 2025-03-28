import { emailSchema, nameSchema, otpSchema } from "@/validators/zod";
import { z } from "zod";

export const signUpReqSchema = z.object({
  emailId: emailSchema,
  firstName: nameSchema,
  lastName: nameSchema,
  otp: otpSchema,
});
