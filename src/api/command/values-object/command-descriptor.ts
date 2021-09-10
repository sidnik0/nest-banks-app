import { BaseCommandDescriptor } from './base-command-descriptor';

export interface CommandDescriptor extends BaseCommandDescriptor {
  params: Map<string, any>;
}
