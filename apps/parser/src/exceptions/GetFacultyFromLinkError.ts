export class GetFacultyFromLinkError extends Error {
  constructor(err: any) {
    super("Can't get faculty from link.");
    this.name = this.constructor.name;
    this.stack = err.stack;
  }
}
