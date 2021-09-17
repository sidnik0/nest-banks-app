import { Inject } from '@nestjs/common';
import { ICommand } from './command.interface';
import { RequiredPropertyValidator } from '../../../common/helper/required-property-validator';
import { PropertyParser } from '../../../common/helper/property-parser';
import { CommandDescriptor } from '../values-object/command-descriptor';
import { CommandResult } from '../values-object/command-result';
import { ParamsDefinition } from '../values-object/params-definition';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';
import { ValidatorException } from 'src/common/exception/validator.exception';

export abstract class BaseCommand implements ICommand {
  private paramsDefinition: ParamsDefinition = this.getParamsDefinition();

  @Inject(RequiredPropertyValidator)
  protected readonly requiredPropertiesValidator: RequiredPropertyValidator;
  @Inject(PropertyParser)
  protected readonly propertyParser: PropertyParser;

  private getParamsDefinition(): ParamsDefinition {
    const paramsDefinition = this.initParamsDefinition();
    paramsDefinition.help = { type: 'never', required: false };

    return paramsDefinition;
  }

  validate({ name, params }: CommandDescriptor): [TypedCommandDescriptor, string[]] {
    const typedParams: Record<string, any> = {};
    const errorMessages: string[] = [];

    for (const prop of Object.keys(this.paramsDefinition)) {
      if (this.paramsDefinition[prop].required) {
        const message = this.requiredPropertiesValidator.validate(prop, params);

        message && errorMessages.push(message);
      }

      if (params.has(prop)) {
        typedParams[prop] = this.propertyParser.parse(params.get(prop), this.paramsDefinition[prop].type);
      }
    }

    return [{ name, params: typedParams }, errorMessages];
  }

  async execute(typedCommandDescriptor: TypedCommandDescriptor, errorMessages?: string[]): Promise<CommandResult> {
    if (typedCommandDescriptor.params.help) {
      return { result: this.getCommandDescription() };
    }

    if (errorMessages && errorMessages.length) {
      const errorString = errorMessages.reduce((previous, current) => previous + ` ${current}`, '');

      throw new ValidatorException(errorString);
    }
  }

  abstract getCommandDescription(): string;
  abstract initParamsDefinition(): ParamsDefinition;
}
