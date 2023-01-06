export class UnknownFacultyError extends Error {
    constructor(id) {
        super(`Faculty with id:${id} is unknown`);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
//# sourceMappingURL=UnknownFacultyError.js.map