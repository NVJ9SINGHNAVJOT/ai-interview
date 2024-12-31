import z from "zod";

// password
export const passwordSchema = z
  .string()
  .min(8)
  .max(20)
  .refine(
    (value) => {
      // Check for at least one uppercase letter
      if (!/[A-Z]/.test(value)) {
        return false;
      }
      // Check for at least one lowercase letter
      if (!/[a-z]/.test(value)) {
        return false;
      }
      // Check for at least one digit
      if (!/\d/.test(value)) {
        return false;
      }
      // Check for at least one special symbol
      if (!/[!@#$%^&*]/.test(value)) {
        return false;
      }
      return true;
    },
    {
      message: "Invalid password format. Please ensure it meets the criteria.",
    }
  );

// name
export const nameSchema = z
  .string()
  .min(1)
  .max(15)
  .regex(/^[a-zA-Z]{2,}$/);

// email
export const emailSchema = z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

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
