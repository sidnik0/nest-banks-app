import { CommandDescriptor } from '../interface/command-descriptor';
import { CommandResult } from '../interface/command-result';

export interface ICommand {
  execute(commandDescriptor: CommandDescriptor): Promise<CommandResult>;
  executeMainLogic(model: Record<string, any>): Promise<any>;
}
