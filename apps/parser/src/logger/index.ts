import { Logger } from "winston";
import { buildDevLogger } from "./dev-logger";
import { buildProdLogger } from "./prod-logger";

let logger: Logger = null;

if (process.env.NODE_ENV === "development") {
  logger = buildDevLogger();
} else {
  logger = buildProdLogger();
}

export default logger;
