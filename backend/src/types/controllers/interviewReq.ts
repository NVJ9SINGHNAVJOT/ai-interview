import { z } from "zod";

export const createInterviewReqSchema = z.object({
  jobPosition: z.string().min(2),
  jobDescription: z
    .string()
    .min(2)
    .max(1000)
    .transform((val) => {
      // Remove leading and trailing empty lines, then trim the result
      return val
        .replace(/^\s*\n+/, "")
        .replace(/\n+\s*$/, "")
        .trim();
    })
    .refine((val) => val.length <= 1000, {
      message: "Job description must be at most 1000 characters long",
    }),
  yearOfExperience: z.number().positive(),
});
