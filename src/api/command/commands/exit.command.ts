import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { CommandResult } from '../values-object/command-result';
import { ParamsDefinition } from '../values-object/params-definition';

@Injectable()
export class ExitCommand extends BaseCommand {
  async execute(): Promise<CommandResult> {
    return { result: 'EXIT', exit: true };
  }

  getCommandDescription(): string {
    return `Close app

    Options:
      help                              Display help for command
    `;
  }

  initParamsDefinition(): ParamsDefinition {
    return;
  }
}
