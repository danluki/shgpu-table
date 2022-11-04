export class GetFacultyFromLinkError extends Error {
  constructor() {
    super("Can't get faculty from link.");
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}
