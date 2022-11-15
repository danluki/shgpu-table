import { info } from "node:console";
import * as winston from "winston";
import { CriticalError } from "../exceptions/CriticalError";
const { combine, timestamp, printf, colorize, splat } = winston.format;

const timezoned = () => {
  return new Date().toLocaleString("en-US", {
    timeZone: process.env.TZ,
  });
};

const messageFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}]: ${message}`;
  if (level.includes("error") && message instanceof Error) {
    const error = message as Error;
    msg = `${timestamp} [${level}]: ${error}`;
  }
  return msg;
});

const messageFormatProduction = printf(
  ({ level, message, timestamp, ...metadata }) => {
    let msg = `${timestamp} [${level}]: ${message}`;
    if (level.includes("error") && message instanceof Error) {
      const error = message as Error;
      msg = `${timestamp} [${level}]: ${error}\r\n${error.stack}`;
    }
    return msg;
  }
);

export const logger = winston.createLogger({
  level: "info",
  format: combine(
    colorize(),
    timestamp({ format: timezoned }),
    splat(),
    messageFormat
  ),
  transports: [],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console({}));
} else {
  logger.add(new winston.transports.Console({}));
  logger.add(
    new winston.transports.File({
      filename: `${process.env.LOGS_PATH}error.log`,
      level: "error",
      format: messageFormatProduction,
      options: { flags: "w" },
    })
  );
  logger.add(
    new winston.transports.File({
      filename: `${process.env.LOGS_PATH}combined.log`,
      format: messageFormatProduction,
      options: { flags: "w" },
    })
  );
}
