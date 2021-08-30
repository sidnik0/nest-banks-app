import { ValidatorException } from '../exseption/validator-exception';

export class RequiredPropertyValidator {
  validate(value: string, required: Map<string, string>) {
    if (!required.has(value))
      throw new ValidatorException(`${value}=value not specified`);
  }
}
