import { configDotenv } from "dotenv";

configDotenv();

export const origins = `${process.env["ALLOWED_ORIGINS"]}`.split(",").map((origin) => origin.trim());
