export class PageParsingError extends Error {
    constructor() {
        super("Error while parsing page");
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
//# sourceMappingURL=PageParsingError.js.map