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
  private errorsMessages: string[] = [];

  @Inject(RequiredPropertyValidator)
  protected readonly requiredPropertiesValidator: RequiredPropertyValidator;
  @Inject(PropertyParser)
  protected readonly propertyParser: PropertyParser;

  private getParamsDefinition(): ParamsDefinition {
    const paramsDefinition = this.initParamsDefinition();
    paramsDefinition.help = { type: 'never', required: false };

    return paramsDefinition;
  }

  validate({ name, params }: CommandDescriptor): TypedCommandDescriptor {
    const typedParams: Record<string, any> = {};
    const errorsMessages: string[] = [];

    for (const prop of Object.keys(this.paramsDefinition)) {
      if (this.paramsDefinition[prop].required) {
        const message = this.requiredPropertiesValidator.validate(prop, params);

        message && errorsMessages.push(message);
      }

      if (params.has(prop)) {
        typedParams[prop] = this.propertyParser.parse(params.get(prop), this.paramsDefinition[prop].type);
      }
    }

    this.errorsMessages = errorsMessages;

    return { name, params: typedParams };
  }

  async execute(typedCommandDescriptor: TypedCommandDescriptor): Promise<CommandResult> {
    if (typedCommandDescriptor.params.help) {
      return { result: this.getCommandDescription() };
    }

    if (this.errorsMessages.length) {
      const errorString = this.errorsMessages.reduce((previous, current) => previous + ` ${current}`, '');

      throw new ValidatorException(errorString);
    }
  }

  abstract getCommandDescription(): string;
  abstract initParamsDefinition(): ParamsDefinition;
}
