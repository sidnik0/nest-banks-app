import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { CommandDescriptor } from '../interface/command-descriptor';
import { CommandResult } from '../interface/command-result';

@Injectable()
export class ExitCommand extends Command {
  async execute({ params }: CommandDescriptor): Promise<CommandResult> {
    if (params.has('help')) return { result: this.getCommandDescription() };

    return { result: 'EXIT', exit: true };
  }

  async executeMainLogic(model: any): Promise<never> {
    throw new Error('Prohibited operation')
  }

  getCommandDescription(): string {
    return `Close app

    Options:
      help                              Display help for command
    `;
  }
}
