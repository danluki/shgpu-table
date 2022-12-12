export class WrongTableNameError extends Error {
  constructor(reason: string) {
    super(`Wrong table name ${reason}`);
  }
}
