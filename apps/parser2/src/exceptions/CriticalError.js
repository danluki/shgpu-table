/**
 * Class representing critical errors, all of this errors are handled by our global exception handler,
 * and throw of this error also means that something very bad happened and table might be corrupted,
 * so we need to notify our users
 *
 */
export class CriticalError extends Error {
    constructor(message, reason) {
        super(message);
        this.stack = reason?.stack;
    }
}
//# sourceMappingURL=CriticalError.js.map