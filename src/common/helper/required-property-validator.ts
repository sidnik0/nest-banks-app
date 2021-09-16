export class RequiredPropertyValidator {
  validate(value: string, required: Map<string, any>): string | undefined {
    if (!required.has(value)) {
      return `Params ${value} not specified`;
    }
  }
}
