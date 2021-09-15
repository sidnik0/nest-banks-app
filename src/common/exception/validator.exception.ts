export class ValidatorException extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, ValidatorException.prototype);
  }
}
