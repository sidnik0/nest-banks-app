export class AccountCreatorException extends Error {
  constructor(message: string) {
    super(message);
  
    Object.setPrototypeOf(this, AccountCreatorException.prototype);
  }
}
  