export function checkEnvVariables() {
  if (
    !process.env["ENVIRONMENT"] ||
    !process.env["ALLOWED_ORIGINS"] ||
    process.env["ALLOWED_ORIGINS"].split(",").map((origin) => origin.trim()).length === 0 ||
    !process.env["SERVER_KEY"] ||
    !process.env["PORT"] ||
    !process.env["MAIL_HOST"] ||
    !process.env["MAIL_USER"] ||
    !process.env["MAIL_PASS"] ||
    !process.env["JWT_SECRET"] ||
    !process.env["TOKEN_NAME"] ||
    !process.env["FOLDER_NAME"] ||
    !process.env["CLOUD_NAME"] ||
    !process.env["API_KEY"] ||
    !process.env["API_SECRET"] ||
    !process.env["POSTGRES_HOST"] ||
    !process.env["POSTGRES_USER"] ||
    !process.env["POSTGRES_DB"] ||
    !process.env["POSTGRES_PASSWORD"]
  ) {
    throw new Error("Invalid evironment variables");
    process.exit();
  }
}
