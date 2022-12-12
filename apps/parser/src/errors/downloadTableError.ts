export class DownloadTableError extends Error {
  constructor(reason: Error) {
    super(`Downloading table error ${reason}`);
  }
}
