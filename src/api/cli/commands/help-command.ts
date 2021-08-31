import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { CommandDescriptor } from '../interface/command-descriptor';
import { CommandResult } from '../interface/command-result';
import { help } from './helps-string';

@Injectable()
export class HelpCommand extends Command {
  async execute({ params }: CommandDescriptor): Promise<CommandResult> {
    return { result: help };
  }
}
