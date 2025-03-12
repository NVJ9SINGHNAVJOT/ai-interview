import z from "zod";

export const stringSchema = (schema: z.ZodString) =>
  schema.refine((value) => value[0] !== " " && value[value.length - 1] !== " ", {
    message: "String contains leading or trailing whitespaces",
  });

export const textSchema = (schema: z.ZodString) =>
  schema.refine(
    (value) => {
      // Trim leading and trailing white spaces and newlines
      const trimmedValue = value.trim().replace(/^\n+|\n+$/g, "");

      // Remove trailing white spaces from each line
      const cleanedValue = trimmedValue
        .split("\n")
        .map((line) => line.replace(/\s+$/, ""))
        .join("\n");

      // Validation conditions
      if (cleanedValue.length === 0) return false; // Check if the string is empty

      // Ensure the cleaned string matches the original input
      return value === cleanedValue;
    },
    {
      message: "String must not have leading/trailing white spaces and new line characters.",
    }
  );

// name
export const nameSchema = stringSchema(
  z
    .string()
    .min(2)
    .max(40)
    .regex(/^[a-zA-Z]{2,}$/)
);

// email
export const emailSchema = stringSchema(z.string().email().max(255));

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
