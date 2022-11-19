export class GettingTableModifyDateError extends Error {
  constructor(path: string) {
    super(`Error, while trying to get ${path} modify date`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
