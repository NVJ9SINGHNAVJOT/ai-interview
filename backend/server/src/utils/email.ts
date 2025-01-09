import { logger } from "@/logger/logger";
import nodemailer from "nodemailer";
import { validationTemplate, verificationTemplate } from "@/utils/templates";

// Function to verify email using the initialized Arcjet instance
export const verifyEmail = (email: string) => {
  // Define a regex pattern to check if the email ends with '@gmail.com'
  const gmailComRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

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
    await sendMail(email, "Verification Email", verificationTemplate(otp));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return true;
  } catch (error: any) {
    logger.error("Error while sending verification email", {
      error: error?.message || "Unknown",
      email: email,
      otp: otp,
    });
    return false;
  }
};

export const sendValidationMail = async (email: string, otp: string) => {
  try {
    await sendMail(email, "Validation Email", validationTemplate(otp));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return true;
  } catch (error: any) {
    logger.error("Error while sending validation email", {
      error: error?.message || "Unknown",
      email: email,
      otp: otp,
    });
    return false;
  }
};
