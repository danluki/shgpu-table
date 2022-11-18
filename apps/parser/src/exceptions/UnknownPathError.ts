export class UnknownPathError extends Error {
  constructor(path: string) {
    super(`Unknown path: path`);
  }
}
