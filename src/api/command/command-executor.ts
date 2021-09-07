import { Injectable } from '@nestjs/common';
import { CommandFactory } from './command-factory';
import { CommandDescriptor } from '../command/interface/command-descriptor';
import { CommandResult } from '../command/interface/command-result';

@Injectable()
export class CommandExecutor {
  constructor(private readonly commandFactory: CommandFactory) {}

  async executeCommand(
    commandDescriptor: CommandDescriptor,
  ): Promise<CommandResult> {
    const command = this.commandFactory.getCommand(commandDescriptor);

    return await command.execute(commandDescriptor);
  }
}
