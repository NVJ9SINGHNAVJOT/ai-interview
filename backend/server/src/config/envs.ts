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
  "ARCJET_ENV",
  "ARCJET_KEY",
  "GEMINI_API_KEY",
  "REDIS_PASSWORD",
  "REDIS_URL",
  "POSTGRES_HOST",
  "POSTGRES_USER",
  "POSTGRES_DB",
  "POSTGRES_PASSWORD",
] as const;

type EnvVariables = Record<(typeof requiredEnvVars)[number], string>;

export function checkEnvVariables(): void {
  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      throw new Error(`Missing or empty environment variable: ${envVar}`);
    }
  });
}

export const envs: EnvVariables = Object.fromEntries(
  requiredEnvVars.map((key) => [key, process.env[key] as string])
) as EnvVariables;
