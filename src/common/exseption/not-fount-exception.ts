export class NotFountException extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, NotFountException.prototype);
  }
}
