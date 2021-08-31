import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { CommandDescriptor } from '../interface/command-descriptor';
import { CommandResult } from '../interface/command-result';
import { exitHelp } from './helps-string';

@Injectable()
export class ExitCommand extends Command {
  async execute({ params }: CommandDescriptor): Promise<CommandResult> {
    const flags = this.getOptionalFlags(params);

    if (flags.includes('help')) return { result: exitHelp };

    return { result: 'EXIT', onExit: true };
  }
}
