import { Command } from './command';
import { CommandDescriptor } from '../interface/command-descriptor';
import { CommandResult } from '../interface/command-result';

export class GetAllTransactionsByAccountCommand extends Command {
  async execute(commandDescriptor: CommandDescriptor): Promise<CommandResult> {
    return undefined;
  }
}
