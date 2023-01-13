export class FetcherError extends Error {
  messages?: string;

  constructor(data: string | Record<string, any>) {
    super(typeof data === "string" ? data : "Query error");
    if (typeof data === "object") {
      this.messages = data.messages;
    }
  }
}
