import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { CommandResult } from '../values-object/command-result';
import { ParamsDefinition } from '../values-object/params-definition';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';

@Injectable()
export class ExitCommand extends BaseCommand {
  async execute(typedCommandDescriptor: TypedCommandDescriptor, errorMessages?: string[]): Promise<CommandResult> {
    const helpResult = await super.execute(typedCommandDescriptor, errorMessages);

    if (helpResult) {
      return helpResult;
    }

    return { result: 'EXIT', exit: true };
  }

  getCommandDescription(): string {
    return `Close app

    Options:
      help                              Display help for command
    `;
  }

  initParamsDefinition(): ParamsDefinition {
    return {};
  }
}
