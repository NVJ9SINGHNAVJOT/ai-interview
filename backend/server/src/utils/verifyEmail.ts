import { envs } from "@/config/envs";
import { logger } from "@/logger/logger";
import arcjet, { validateEmail } from "@arcjet/node";
import { Request } from "express";

const aj = arcjet({
  // Get your site key from https://app.arcjet.com and set it as an environment
  // variable rather than hard coding.
  key: envs.ARCJET_KEY,
  rules: [
    validateEmail({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      // block disposable, invalid, and email addresses with no MX records
      block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS", "NO_GRAVATAR", "FREE"],
    }),
  ],
});

const verifyEmail = async (req: Request, email: string): Promise<{ accepted: boolean; error: boolean }> => {
  try {
    const decision = await aj.protect(req, {
      email: email,
    });
    console.log("Arcjet decision", decision);

    if (decision.isDenied()) {
      return { accepted: false, error: false };
    }
    return { accepted: true, error: false };
  } catch (error: any) {
    logger.error("arcjet validation failed", { email: email, error: "message" in error ? error.message : "unknown" });
    return { accepted: false, error: true };
  }
};

export default verifyEmail;
