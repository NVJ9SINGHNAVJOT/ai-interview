import { createLogger, transports, format } from "winston";
import LokiTransport from "winston-loki";

const developmentLogger = () => {
  return createLogger({
    transports: [
      // printed on console
      new transports.Console({
        level: "silly",
        format: format.combine(
          format.colorize(),
          format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}. data:`;
          })
        ),
      }),
      new transports.Console({
        level: "silly",
        format: format.combine(
          format.printf(({ timestamp, level, message, ...args }) => JSON.stringify(args, null, 2))
        ),
      }),

      // Loki logging
      new LokiTransport({
        level: "silly",
        host: process.env["LOKI_URL"] as string,
        json: true,
        format: format.combine(
          format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          format.printf(({ timestamp, level, message, ...meta }) =>
            JSON.stringify({ timestamp, level, message, ...meta })
          )
        ),
        labels: {
          service: "ai-interview-server",
          project: "ai-interview",
          environment: "development",
          language: "nodejs",
        },
      }),
    ],
  });
};

export default developmentLogger;
