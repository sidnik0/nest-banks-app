import { ValidatorException } from '../exception/validator.exception';

export class RequiredPropertyValidator {
  validate(value: string, required: Map<string, any>) {
    if (!required.has(value)) {
      throw new ValidatorException(`${value}=value not specified`);
    }
  }
}
