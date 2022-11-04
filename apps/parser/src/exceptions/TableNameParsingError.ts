export class TableNameParsingError extends Error {
  constructor() {
    super("Table name parsing error.");
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}
