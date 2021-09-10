import { Injectable } from '@nestjs/common';
import { CommandDescriptor } from '../command/values-object/command-descriptor';
import { CommandLineParserException } from '../../common/exseption/command-line-parser-exception';
import { CommandName } from '../../types/command-name.type';

@Injectable()
export class ConsoleLineParser {
  parseInput(args: string): CommandDescriptor {
    const [firstArg, ...rawArgs] = args.trim().split(' ');

    if (!firstArg) throw new CommandLineParserException(`Command: ${firstArg} not entered`);

    const processedArgs = new Map<string, string>();

    for (const arg of rawArgs) {
      if (!arg) continue;

      const arrayStrings = arg.split('=');

      processedArgs.set(arrayStrings[0], arrayStrings[1]);
    }

    return { name: firstArg as CommandName, params: processedArgs };
  }
}
