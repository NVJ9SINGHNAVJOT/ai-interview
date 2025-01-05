import { z } from "zod";

export const SendOtpReqSchema = z.object({
  email: z.string().email(),
  type: z.enum(["signup", "login"]),
});
