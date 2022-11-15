export class DuplicatePairsError extends Error {
  constructor(reason: Error = null) {
    super("Duplicated pairs");
    this.stack = reason?.stack;
  }
}
