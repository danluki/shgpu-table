export class ApiError extends Error {
  public code: number;

  constructor(message: string, reason: Error, code: number = 500) {
    super(message);
    this.code = code;
    this.stack = reason.stack;
  }
}
