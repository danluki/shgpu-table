export class InvalidLinkError extends Error {
    constructor(link: string) {
        super(`Invalid link - ${link}`);
    }
}