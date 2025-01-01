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
    "GEMINI_API_KEY",
    "REDIS_PASSWORD",
    "REDIS_URL",
    "POSTGRES_HOST",
    "POSTGRES_USER",
    "POSTGRES_DB",
    "POSTGRES_PASSWORD",
  ];

  // Check if required environment variables are present
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar] || process.env[envVar].trim() === "") {
      throw new Error(`Missing or empty environment variable: ${envVar}`);
    }
  }
}
