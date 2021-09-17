import { Injectable } from '@nestjs/common';
import { ICommand } from './commands/command.interface';
import { CommandDescriptor } from './values-object/command-descriptor';
import { CommandExecutor } from './command-executor';
import { CommandResult } from './values-object/command-result';

@Injectable()
export class CliCommandExecutor extends CommandExecutor {
  async doExecute(command: ICommand, commandDescriptor: CommandDescriptor): Promise<CommandResult> {
    const [typedCommandDescriptor, errorMessages] = command.validate(commandDescriptor);

    return await command.execute(typedCommandDescriptor, errorMessages);
  }
}
