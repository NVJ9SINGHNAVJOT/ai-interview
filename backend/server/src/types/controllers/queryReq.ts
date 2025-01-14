import { emailSchema, textSchema } from "@/validators/zod";
import z from "zod";

export const createQueryReqSchema = z.object({
  fullName: z
    .string()
    .min(2)
    .max(80)
    .regex(/^[a-zA-Z]{2,}$/)
    .refine((value) => value === value.trim(), { message: "String contains leading or trailing whitespaces" }),
  emailId: emailSchema,
  queryText: textSchema(z.string().min(1).max(500)),
});
