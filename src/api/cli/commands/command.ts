import { Inject } from '@nestjs/common';

import { RequiredPropertyValidator } from '../../../common/helper/required-property-validator';
import { PropertyParser } from '../../../common/helper/property-parser';

import { CommandDescriptor } from '../interface/command-descriptor';
import { CommandResult } from '../interface/command-result';

export abstract class Command {
  protected optionalFlags: string[] = ['help'];
  protected requiredProperties: Record<string, string>;

  @Inject(RequiredPropertyValidator)
  protected readonly requiredPropertiesValidator: RequiredPropertyValidator;
  @Inject(PropertyParser)
  protected readonly propertyParser: PropertyParser;

  abstract execute(
    commandDescriptor: CommandDescriptor,
  ): Promise<CommandResult>;

  protected validateAndParseProperties<T>(properties: Map<string, string>): T {
    const obj: Record<string, any> = {};

    for (const prop of Object.keys(this.requiredProperties)) {
      this.requiredPropertiesValidator.validate(prop, properties);

      obj[prop] = this.propertyParser.parse(
        properties.get(prop),
        this.requiredProperties[prop],
      );
    }

    return obj as T;
  }

  protected getOptionalFlags(properties: Map<string, string>): string[] {
    const optionalFlags: string[] = [];

    for (const prop of this.optionalFlags) {
      if (!properties.has(prop)) continue;

      optionalFlags.push(prop);
    }

    return optionalFlags;
  }
}
