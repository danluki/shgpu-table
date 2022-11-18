export class UnknownFacultyError extends Error {
  constructor(id: number) {
    console.log(id);
    super(`Faculty with id:${id} is unknown`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
