import { CommandDescriptor } from '../values-object/command-descriptor';
import { CommandResult } from '../values-object/command-result';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';

export interface ICommand {
  validate(commandDescriptor: CommandDescriptor): [TypedCommandDescriptor, string[]];
  execute(typedCommandDescriptor: TypedCommandDescriptor, errorMessages?: string[]): Promise<CommandResult>;
}
