export class DownloadingTableError extends Error {
    constructor(err) {
        super("Downloading table error.");
        this.stack = err.stack;
        Error.captureStackTrace(this, this.constructor);
    }
}
//# sourceMappingURL=DownloadingTableError.js.map