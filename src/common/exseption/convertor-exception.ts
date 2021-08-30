export class ConvertorException extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, ConvertorException.prototype);
  }
}
