export class ChatIsAlreadySubscribedError extends Error {
  constructor(reason: any) {
    super("This chat is already subscribed.");
    this.stack = reason.stack;
  }
}
