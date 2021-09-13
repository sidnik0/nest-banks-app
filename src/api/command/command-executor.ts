import { Inject } from '@nestjs/common';
import { CommandFactory } from './command-factory';
import { ICommand } from './commands/command.interface';
import { CommandDescriptor } from './values-object/command-descriptor';
import { CommandResult } from './values-object/command-result';
import { TypedCommandDescriptor } from './values-object/typed-command-descriptor';

export abstract class CommandExecutor {
  @Inject(CommandFactory)
  protected readonly commandFactory: CommandFactory;

  async executeCommand(commandDescriptor: CommandDescriptor | TypedCommandDescriptor): Promise<CommandResult> {
    const command = this.commandFactory.getCommand(commandDescriptor);

    return await this.factoryMethod(command, commandDescriptor);
  }

  abstract factoryMethod(
    command: ICommand,
    commandDescriptor: CommandDescriptor | TypedCommandDescriptor,
  ): Promise<CommandResult>;
}
