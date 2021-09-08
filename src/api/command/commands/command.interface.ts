import { CommandDescriptor } from "../interface/command-descriptor";
import { CommandResult } from "../interface/command-result";

export interface ICommand {
  execute(commandDescriptor: CommandDescriptor): Promise<CommandResult>;
  validateAndParseProperties(params: Map<string, string>): Record<string, any>;
  getCommandDescription(): string;
  performAdditionally(model: Record<string, any>): Promise<any>;
}