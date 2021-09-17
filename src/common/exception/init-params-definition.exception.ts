export class InitParamsDefinitionException extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, InitParamsDefinitionException.prototype);
  }
}
