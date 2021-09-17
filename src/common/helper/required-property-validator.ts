import { ValidatorException } from '../exception/validator.exception';

export class RequiredPropertyValidator {
  validate(value: string, required: Map<string, any>, returnsAnErrorMessage?: boolean): string {
    if (!required.has(value)) {
      if (returnsAnErrorMessage) {
        throw new ValidatorException(`${value}: Param not specified`);
      }

      return `${value}: Param not specified`;
    }
  }
}
