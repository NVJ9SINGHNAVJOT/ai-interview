import developmentLogger from "@/logger/development";
import winston from "winston";
import productionLogger from "@/logger/production";

export let logger: winston.Logger;

export const loggerConfig = (environment: string) => {
  if (environment === "development") {
    logger = developmentLogger();
  } else if (environment === "production") {
    logger = productionLogger();
  }
};
