import z from "zod";

// name
export const nameSchema = z
  .string()
  .min(2)
  .max(40)
  .regex(/^[a-zA-Z]{2,}$/)
  .refine((value) => value === value.trim(), { message: "String contains leading or trailing whitespaces" });

// email
export const emailSchema = z
  .string()
  .email()
  .refine((value) => value === value.trim(), { message: "String contains leading or trailing whitespaces" });

// otp
export const otpSchema = z
  .string()
  .length(6)
  .regex(/^[1-9][0-9]{5}$/);

// postgreSQL id
export const postgreSQLIdSchema = z
  .string()
  .min(1)
  .regex(/^[1-9]\d*$/);
