export class ApiError extends Error {
    code;
    constructor(message, reason, code = 500) {
        super(message);
        this.code = code;
        this.stack = reason.stack;
    }
}
//# sourceMappingURL=ApiError.js.map