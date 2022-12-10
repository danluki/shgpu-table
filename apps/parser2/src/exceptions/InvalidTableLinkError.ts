export class InvalidTableLinkError extends Error {
  constructor() {
    super("Error, while getting name from given path.");
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
