export class UnknownGroupError extends Error {
  constructor() {
    super("Can't find group");
  }
}
