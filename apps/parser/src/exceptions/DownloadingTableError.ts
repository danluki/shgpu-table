export class DownloadingTableError extends Error {
  constructor(err: any) {
    super("Downloading table error.");
    this.stack = err.stack;
    //Error.captureStackTrace(this, this.constructor);
  }
}
