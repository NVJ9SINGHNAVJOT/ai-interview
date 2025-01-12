const environmentVariables = [
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
  "REDIS_HOST",
  "REDIS_PORT",
  "REDIS_PASSWORD",
  "POSTGRES_MIGRATE",
  "POSTGRES_TRIGGER",
  "POSTGRES_HOST",
  "POSTGRES_USER",
  "POSTGRES_DB",
  "POSTGRES_PASSWORD",
];

export function checkEnvVariables(): void {
  environmentVariables.forEach((envVar) => {
    if (!process.env[envVar] || process.env[envVar].trim() === "") {
      throw new Error(`Missing or empty environment variable: ${envVar}`);
    }
  });
}
