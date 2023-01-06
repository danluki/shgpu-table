import { format, createLogger, transports } from "winston";
const { combine, timestamp, printf, colorize, splat, errors, json } = format;
let openedTransports = 0;
export function buildProdLogger() {
    const logFormat = printf(({ level, message, timestamp, stack, durationMs }) => {
        return `${timestamp} ${level}: ${stack || message}${durationMs ? " | " + durationMs + "ms" : ""}`;
    });
    const options = {
        console: {
            handleExceptions: true,
            level: "debug",
            format: combine(colorize(), timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), errors({ stack: true }), logFormat),
        },
        combined: {
            filename: `${process.env.LOGS_PATH}combined.log`,
            maxsize: 10000000,
            maxFiles: 10,
            tailable: true,
            format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), errors({ stack: true }), logFormat),
        },
        error: {
            filename: `${process.env.LOGS_PATH}error.log`,
            level: "error",
            maxsize: 10000000,
            maxFiles: 10,
            tailable: true,
            format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), errors({ stack: true }), logFormat),
        },
        exception: {
            filename: `${process.env.LOGS_PATH}exception.log`,
            level: "error",
            maxsize: 10000000,
            maxFiles: 10,
            tailable: true,
            format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), errors({ stack: true }), logFormat),
        },
    };
    function fileFinished() {
        openedTransports--;
        if (openedTransports === 0) {
            process.exit(0);
        }
    }
    const combinedFile = new transports.File(options.combined);
    const errorFile = new transports.File(options.error);
    const exceptionFile = new transports.File(options.exception);
    combinedFile.on("open", () => {
        openedTransports++;
        combinedFile.on("finish", () => {
            fileFinished();
        });
    });
    errorFile.on("open", () => {
        openedTransports++;
        errorFile.on("finish", () => {
            fileFinished();
        });
    });
    return createLogger({
        defaultMeta: { service: "parser" },
        transports: [
            new transports.Console(options.console),
            combinedFile,
            errorFile,
        ],
        exceptionHandlers: [exceptionFile],
    });
}
//# sourceMappingURL=prod-logger.js.map