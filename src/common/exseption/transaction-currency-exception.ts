export class TransactionCurrencyException extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, TransactionCurrencyException.prototype);
  }
}