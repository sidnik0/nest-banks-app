import { Injectable } from '@nestjs/common';
import { ICommand } from './commands/command.interface';
import { CommandDescriptor } from './interface/command-descriptor';
import { ICommandExecutor } from './interface/command-executor';
import { CommandResult } from './interface/command-result';

@Injectable()
export class CliCommandExecutor extends ICommandExecutor {
  async factoryMethod(
    command: ICommand,
    commandDescriptor: CommandDescriptor,
  ): Promise<CommandResult> {
    return await command.execute(commandDescriptor);
  }
}
