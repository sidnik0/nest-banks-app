export class CommandFactoryException extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CommandFactoryException.prototype);
  }
}
