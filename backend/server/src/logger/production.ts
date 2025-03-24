import { createLogger, format, transports } from "winston";

const productionLogger = () => {
  return createLogger({
    transports: [
      // Printed on console
      new transports.Console({
        level: "http",
        format: format.combine(
          format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          format.json(),
          format.prettyPrint()
        ),
      }),
      // Saved in logs/production.log
      new transports.File({
        level: "http",
        dirname: "logs",
        filename: "production.log",
        maxsize: 10 * 1024 * 1024, // 10 MB
        maxFiles: 20, // Keep last 20 log files
        format: format.combine(
          format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          format.json(),
          format.printf(({ timestamp, level, message, ...args }) => {
            return JSON.stringify({ timestamp: timestamp, level: level, message: message, data: args });
          })
        ),
      }),
    ],
  });
};

export default productionLogger;
