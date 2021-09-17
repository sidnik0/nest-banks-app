import { Inject } from '@nestjs/common';
import { CommandFactory } from './command-factory';
import { ICommand } from './commands/command.interface';
import { BaseCommandDescriptor } from './values-object/base-command-descriptor';
import { CommandResult } from './values-object/command-result';

export abstract class CommandExecutor {
  @Inject(CommandFactory)
  protected readonly commandFactory: CommandFactory;

  async executeCommand(commandDescriptor: BaseCommandDescriptor): Promise<CommandResult> {
    const command = this.commandFactory.getCommand(commandDescriptor);

    return await this.doExecute(command, commandDescriptor);
  }

  abstract doExecute(command: ICommand, commandDescriptor: BaseCommandDescriptor): Promise<CommandResult>;
}
