import { logger } from "@/logger/logger";
import nodemailer from "nodemailer";
import { validationTemplate, verificationTemplate } from "@/utils/templates";
import { getErrorDetails } from "@/logger/error";

// Regex pattern to check if the email ends with '@gmail.com'
const gmailComRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

// Function to verify email using the initialized Arcjet instance
export const verifyEmail = (email: string) => {
  // Test the email against the pattern
  return gmailComRegex.test(email);
};

const sendMail = async (email: string, title: string, body: string): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: `${process.env["MAIL_HOST"]}`,
    auth: {
      user: `${process.env["MAIL_USER"]}`,
      pass: `${process.env["MAIL_PASS"]}`,
    },
  });

  /*
    FIXME: for invalid email id, nodemailer throws error only some times. 
    this need to be changed and error to be thrown every time.
  */
  /* NOTE: commented only for development purpose, remove comment in production */
  await transporter.sendMail({ from: "AI-Interview", to: email, subject: title, html: body });
};

export const sendVerficationMail = async (email: string, otp: string) => {
  try {
    if (process.env["ENVIRONMENT"] === "development") {
      logger.debug("otp", { email: email, otp: otp });
      return true;
    }
    await sendMail(email, "Verification Email", verificationTemplate(otp));

    return true;
  } catch (error) {
    logger.error("Error while sending verification email", {
      error: getErrorDetails(error),
      email: email,
      otp: otp,
    });
    return false;
  }
};

export const sendValidationMail = async (email: string, otp: string) => {
  try {
    if (process.env["ENVIRONMENT"] === "development") {
      logger.debug("otp", { email: email, otp: otp });
      return true;
    }
    await sendMail(email, "Validation Email", validationTemplate(otp));

    return true;
  } catch (error) {
    logger.error("Error while sending validation email", {
      error: getErrorDetails(error),
      email: email,
      otp: otp,
    });
    return false;
  }
};
