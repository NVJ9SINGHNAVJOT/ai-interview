import { checkWhitespaceAndNewlines } from "@/utils/stringFormat";
import { emailSchema } from "@/validators/zod";
import z from "zod";

export const createQueryReqSchema = z.object({
  fullName: z
    .string()
    .min(2)
    .max(80)
    .regex(/^[a-zA-Z]{2,}$/)
    .refine((value) => value === value.trim(), { message: "String contains leading or trailing whitespaces" }),
  emailId: emailSchema,
  queryText: z
    .string()
    .min(1)
    .refine((value) => checkWhitespaceAndNewlines(value, 500), {
      message: "String contains leading or trailing whitespaces or new lines",
    }),
});
