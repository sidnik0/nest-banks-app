import { CommandDescriptor } from '../values-object/command-descriptor';
import { CommandResult } from '../values-object/command-result';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';

export interface ICommand {
  getDescription(commandDescriptor: CommandDescriptor): CommandResult;
  validate(commandDescriptor: CommandDescriptor): TypedCommandDescriptor;
  execute(typedCommandDescriptor: TypedCommandDescriptor): Promise<CommandResult>;
}
