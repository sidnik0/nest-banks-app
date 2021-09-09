import { Inject } from '@nestjs/common';
import { CommandFactory } from '../command-factory';
import { ICommand } from '../commands/command.interface';
import { CommandDescriptor } from './command-descriptor';
import { CommandResult } from './command-result';

export abstract class ICommandExecutor {
  @Inject(CommandFactory)
  protected readonly commandFactory: CommandFactory

  async executeCommand(commandDescriptor: CommandDescriptor): Promise<CommandResult> {
    const command = this.commandFactory.getCommand(commandDescriptor);

    return await this.factoryMethod(command, commandDescriptor);
  }

  abstract factoryMethod(command: ICommand, commandDescriptor: CommandDescriptor): Promise<CommandResult>;
}