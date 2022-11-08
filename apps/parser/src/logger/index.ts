import { info } from "node:console";
import * as winston from "winston";
import { CriticalError } from "../exceptions/CriticalError";
const { combine, timestamp, label, printf } = winston.format;

const timezoned = () => {
  return new Date().toLocaleString("en-US", {
    timeZone: process.env.TZ,
  });
};

const messageFormat = printf((data: any) => {
  console.log(data);
  return "";
  // if (level === "error") {
  //   return `[${label}] ${timestamp} ${level}: ${error}`;
  // }
  // return `[${label}] ${timestamp} ${level}: ${message}`;
});

export const logger = winston.createLogger({
  level: "info",
  format: combine(
    label({ label: "Parser:" }),
    timestamp({ format: timezoned }),
    messageFormat
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
