import { BaseCommandDescriptor } from './base-command-descriptor';

export interface TypedCommandDescriptor extends BaseCommandDescriptor {
  params: Record<string, any>;
}
