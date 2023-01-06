export class TableParsingError extends Error {
    constructor() {
        super("Error in parsing table");
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
//# sourceMappingURL=TableParsingError.js.map