export class UnknownFacultyError extends Error {
  constructor() {
    super("Faculty is unknown.");
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}
