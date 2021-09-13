import { Inject } from '@nestjs/common';
import { ICommand } from './command.interface';
import { RequiredPropertyValidator } from '../../../common/helper/required-property-validator';
import { PropertyParser } from '../../../common/helper/property-parser';
import { CommandDescriptor } from '../values-object/command-descriptor';
import { CommandResult } from '../values-object/command-result';
import { ParamsDefinition } from '../values-object/params-definition';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';

export abstract class BaseCommand implements ICommand {
  protected paramsDefinition: ParamsDefinition = this.initParamsDefinition();

  @Inject(RequiredPropertyValidator)
  protected readonly requiredPropertiesValidator: RequiredPropertyValidator;
  @Inject(PropertyParser)
  protected readonly propertyParser: PropertyParser;

  getDescription(commandDescriptor: CommandDescriptor): CommandResult {
    if (commandDescriptor.params.has('help')) {
      return { result: this.getCommandDescription() };
    }
  }

  validate({ name, params }: CommandDescriptor): TypedCommandDescriptor {
    if (!this.paramsDefinition) {
      return null;
    }

    const obj: Record<string, any> = {};

    for (const prop of Object.keys(this.paramsDefinition)) {
      if (this.paramsDefinition[prop].required) {
        this.requiredPropertiesValidator.validate(prop, params);
      }

      if (params.has(prop)) {
        obj[prop] = this.propertyParser.parse(params.get(prop), this.paramsDefinition[prop].type);
      }
    }

    return { name, params: obj };
  }

  abstract execute(typedCommandDescriptor: TypedCommandDescriptor): Promise<CommandResult>;
  abstract getCommandDescription(): string;
  abstract initParamsDefinition(): ParamsDefinition;
}
