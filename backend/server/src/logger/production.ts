import { createLogger, format, transports } from "winston";

const productionLogger = () => {
  return createLogger({
    transports: [
      // printed on console
      new transports.Console({
        level: "http",
        format: format.combine(
          format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          format.json(),
          format.prettyPrint()
        ),
      }),
    ],
    // silent: true,
  });
};

export default productionLogger;
