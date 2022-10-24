import * as winston from "winston";
const { combine, timestamp, label, printf } = winston.format;

const timezoned = () => {
  return new Date().toLocaleString("en-US", {
    timeZone: process.env.TZ,
  });
};

const messageFormat = printf(({ level, message, label, timestamp }) => {
  return `[${label}] ${timestamp} ${level}: ${message}`;
});

export const logger = winston.createLogger({
  level: "info",
  format: combine(
    label({ label: "Parser:" }),
    timestamp({ format: timezoned }),
    messageFormat,
  ),
  transports: [],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console({}));
} else {
  logger.add(
    new winston.transports.File({
      filename: `${process.env.LOGS_PATH}error.log`,
      level: "error",
    })
  );
  logger.add(
    new winston.transports.File({
      filename: `${process.env.LOGS_PATH}combined.log`,
    })
  );
}
