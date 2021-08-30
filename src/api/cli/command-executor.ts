import { Injectable } from '@nestjs/common';
import { CommandFactory } from './command-factory';
import { CommandDescriptor } from './interface/command-descriptor';
import { CommandResult } from './interface/command-result';

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
