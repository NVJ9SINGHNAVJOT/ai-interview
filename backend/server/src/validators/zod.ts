import z from "zod";

// name
export const nameSchema = z
  .string()
  .min(1)
  .max(30)
  .regex(/^[a-zA-Z]{1,}$/);

// otp
export const optSchema = z
  .string()
  .length(6)
  .regex(/^[1-9][0-9]{5}$/);

// postgreSQL id
export const postgreSQLIdSchema = z
  .string()
  .min(1)
  .regex(/^[1-9]\d*$/);
