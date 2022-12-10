export class GetFacultyFromLinkError extends Error {
  constructor() {
    super("Can't get faculty from link.");
    this.name = this.constructor.name;
  }
}
