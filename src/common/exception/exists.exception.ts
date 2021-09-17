export class ExistsException extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, ExistsException.prototype);
  }
}
