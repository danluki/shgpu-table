export class DownloadingPageError extends Error {
  constructor() {
    super("Error while downloading page.");
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
