export class ChatIsAlreadySubscribedError extends Error {
    constructor(reason) {
        super("This chat is already subscribed.");
        this.stack = reason.stack;
    }
}
//# sourceMappingURL=ChatIsAlreadySubcribed.js.map