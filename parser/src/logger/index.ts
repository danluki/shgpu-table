import * as winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { source: "parser" },
  transports: [
    new winston.transports.File({
      filename: `${process.env.LOGS_PATH}error.log`,
      level: "error",
    }),
    new winston.transports.File({
      filename: `${process.env.LOGS_PATH}combined.log`,
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}
