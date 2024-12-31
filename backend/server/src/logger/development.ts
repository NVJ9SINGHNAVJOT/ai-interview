import { createLogger, transports, format } from "winston";

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
        format: format.combine(format.json(), format.prettyPrint()),
      }),

      // saved in logs
      new transports.File({
        level: "silly",
        dirname: "logs",
        filename: "development.log",
        format: format.combine(
          format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          format.json(),
          format.printf(({ timestamp, level, message, ...args }) => {
            // return JSON.stringify({ timestamp: timestamp, level: level, message: message, data: args });
            return `[${timestamp}] ${level}: ${message}. ${"data: " + JSON.stringify(args)}}`;
          })
        ),
      }),
    ],
  });
};

export default developmentLogger;
