import { emailSchema, stringSchema, textSchema } from "@/validators/zod";
import z from "zod";

export const createQueryReqSchema = z.object({
  fullName: stringSchema(
    z
      .string()
      .min(2)
      .max(80)
      .regex(/^[a-zA-Z]{2,}$/)
  ),
  emailId: emailSchema,
  queryText: textSchema(z.string().min(1).max(500)),
});
