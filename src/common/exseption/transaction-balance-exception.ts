export class TransactionBalanceException extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, TransactionBalanceException.prototype);
  }
}
