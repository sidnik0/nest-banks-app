import { Injectable } from '@nestjs/common';
import { ICommand } from './commands/command.interface';
import { CommandExecutor } from './command-executor';
import { CommandResult } from './values-object/command-result';
import { TypedCommandDescriptor } from './values-object/typed-command-descriptor';

@Injectable()
export class RestCommandExecutor extends CommandExecutor {
  async doExecute(command: ICommand, typedCommandDescriptor: TypedCommandDescriptor): Promise<CommandResult> {
    return await command.execute(typedCommandDescriptor);
  }
}
