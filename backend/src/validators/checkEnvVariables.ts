export function checkEnvVariables() {
  const requiredEnvVars = [
    "ENVIRONMENT",
    "ALLOWED_ORIGINS",
    "SERVER_KEY",
    "PORT",
    "MAIL_HOST",
    "MAIL_USER",
    "MAIL_PASS",
    "JWT_SECRET",
    "TOKEN_NAME",
    "FOLDER_NAME",
    "CLOUD_NAME",
    "API_KEY",
    "API_SECRET",
    "GEMINI_API_KEY",
    "POSTGRES_HOST",
    "POSTGRES_USER",
    "POSTGRES_DB",
    "POSTGRES_PASSWORD",
  ];

  // Check if required environment variables are present
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar] || process.env[envVar]?.trim() === "") {
      throw new Error(`Missing or empty environment variable: ${envVar}`);
    }
  }

  // Validate ALLOWED_ORIGINS
  const allowedOrigins = process.env["ALLOWED_ORIGINS"]?.split(",").map((origin) => origin.trim());
  if (!allowedOrigins || allowedOrigins.length === 0 || allowedOrigins.includes("")) {
    throw new Error("ALLOWED_ORIGINS must contain at least one valid origin");
  }
}
