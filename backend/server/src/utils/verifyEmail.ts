import { logger } from "@/logger/logger";
import { Request } from "express";

// Variable to store the initialized Arcjet instance
let arcjetInstance: any;

// Function to initialize Arcjet and its rules
export const arcjetInitialization = async () => {
  try {
    const arcjetModule = await import("@arcjet/node"); // Dynamic import for ESM compatibility
    const arcjet = arcjetModule.default;
    const validateEmail = arcjetModule.validateEmail;

    arcjetInstance = arcjet({
      key: process.env["ARCJET_KEY"],
      rules: [
        validateEmail({
          mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
          // block disposable, invalid, and email addresses with no MX records
          block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS", "NO_GRAVATAR", "FREE"],
        }),
      ],
    });
  } catch (error: any) {
    logger.error("Arcjet initialization failed", { error: error?.message || "Unknown error" });
  }
};

// Function to verify email using the initialized Arcjet instance
export const verifyEmail = async (req: Request, email: string): Promise<{ accepted: boolean; error: boolean }> => {
  try {
    const decision = await arcjetInstance.protect(req, { email });
    console.log("Arcjet decision", decision);

    if (decision.isDenied()) {
      return { accepted: false, error: false };
    }
    return { accepted: true, error: false };
  } catch (error: any) {
    logger.error("Arcjet validation failed", {
      email: email,
      error: error?.message || "Unknown error",
    });
    return { accepted: false, error: true };
  }
};
