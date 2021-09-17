import { Inject } from '@nestjs/common';
import { ICommand } from './command.interface';
import { RequiredPropertyValidator } from '../../../common/helper/required-property-validator';
import { PropertyParser } from '../../../common/helper/property-parser';
import { CommandDescriptor } from '../values-object/command-descriptor';
import { CommandResult } from '../values-object/command-result';
import { ParamsDefinition } from '../values-object/params-definition';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';
import { ValidatorException } from '../../../common/exception/validator.exception';
import { ConvertorException } from '../../../common/exception/convertor.exception';
import { InitParamsDefinitionException } from '../../../common/exception/init-params-definition.exception';

export abstract class BaseCommand implements ICommand {
  private paramsDefinition: ParamsDefinition = this.getParamsDefinition();

  @Inject(RequiredPropertyValidator)
  protected readonly requiredPropertiesValidator: RequiredPropertyValidator;
  @Inject(PropertyParser)
  protected readonly propertyParser: PropertyParser;

  private getParamsDefinition(): ParamsDefinition {
    const paramsDefinition = this.initParamsDefinition();

    if (!paramsDefinition) {
      throw new InitParamsDefinitionException('initParamsDefinition method should return an object');
    }

    paramsDefinition.help = { type: 'help', required: false };

    return paramsDefinition;
  }

  validate({ name, params }: CommandDescriptor): TypedCommandDescriptor {
    const typedParams: Record<string, any> = {};
    const errorValidationMessages: string[] = [];
    const errorParserMessages: string[] = [];

    for (const prop of Object.keys(this.paramsDefinition)) {
      if (this.paramsDefinition[prop].required) {
        const message = this.requiredPropertiesValidator.validate(prop, params);

        message && errorValidationMessages.push(message);
      }

      if (params.has(prop)) {
        const parseData = this.propertyParser.parse(params.get(prop), this.paramsDefinition[prop].type);

        if (parseData.error) {
          errorParserMessages.push(`${prop}: ${parseData.error}`);
        } else {
          typedParams[prop] = parseData.value;
        }
      }
    }

    if (typedParams.help && Object.keys(typedParams).length === 1) {
      return { name, params: typedParams };
    }

    this.errorChecking(errorValidationMessages, errorParserMessages);

    return { name, params: typedParams };
  }

  private errorChecking(errorValidationMessages: string[], errorParserMessages: string[]): void {
    if (errorValidationMessages.length) {
      const errorString = errorValidationMessages.reduce((previous, current) => previous + `\n -${current}`, '');

      throw new ValidatorException(errorString);
    }

    if (errorParserMessages.length) {
      const errorString = errorParserMessages.reduce((previous, current) => previous + `\n -${current}`, '');

      throw new ConvertorException(errorString);
    }
  }

  async execute(typedCommandDescriptor: TypedCommandDescriptor): Promise<CommandResult> {
    if (typedCommandDescriptor.params.help) {
      return { result: this.getCommandDescription() };
    }

    delete typedCommandDescriptor.params['help'];

    return this.doExecute(typedCommandDescriptor);
  }

  abstract doExecute(typedCommandDescriptor: TypedCommandDescriptor): Promise<CommandResult>;
  abstract getCommandDescription(): string;
  abstract initParamsDefinition(): ParamsDefinition;
}
