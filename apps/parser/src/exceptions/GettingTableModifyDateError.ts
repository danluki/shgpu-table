export class GettingTableModifyDateError extends Error {
  constructor() {
    super("Error, while trying to get table modify date");
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
