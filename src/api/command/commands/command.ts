import { Inject } from '@nestjs/common';
import { ICommand } from './command.interface';
import { RequiredPropertyValidator } from '../../../common/helper/required-property-validator';
import { PropertyParser } from '../../../common/helper/property-parser';
import { CommandDescriptor } from '../interface/command-descriptor';
import { CommandResult } from '../interface/command-result';

export abstract class Command implements ICommand {
  protected paramsDefinition: Record<string, {type: string, required: boolean}>;

  @Inject(RequiredPropertyValidator)
  protected readonly requiredPropertiesValidator: RequiredPropertyValidator;
  @Inject(PropertyParser)
  protected readonly propertyParser: PropertyParser;

  async execute({params}: CommandDescriptor): Promise<CommandResult> {
    if (params.has('help')) return Promise.resolve({result: this.getCommandDescription()});

    const model = this.validateAndParseProperties(params);

    const result = await this.executeMainLogic(model);

    return { result };
  }

  protected validateAndParseProperties(params: Map<string, string>): Record<string, any> {
    if (!this.paramsDefinition) return null;

    const obj: Record<string, any> = {};

    for (const prop of Object.keys(this.paramsDefinition)) {
      if (this.paramsDefinition[prop].required) {
        this.requiredPropertiesValidator.validate(prop, params); 
      }

      if (params.has(prop)) {
        obj[prop] = this.propertyParser.parse(
          params.get(prop),
          this.paramsDefinition[prop].type,
        );
      }
    }

    return obj;
  }

  abstract executeMainLogic(model: Record<string, any>): Promise<any>;

  abstract getCommandDescription(): string;
}
