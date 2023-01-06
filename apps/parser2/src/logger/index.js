import { buildDevLogger } from "./dev-logger";
import { buildProdLogger } from "./prod-logger";
let logger = null;
if (process.env.NODE_ENV === "development") {
    logger = buildDevLogger();
}
else {
    logger = buildProdLogger();
}
export default logger;
//# sourceMappingURL=index.js.map