import { Injectable } from '@nestjs/common';
import { CommandDescriptor } from '../command/interface/command-descriptor';
import { CommandLineParserException } from '../../common/exseption/command-line-parser-exception';

@Injectable()
export class CommandLineParser {
  parseInput(args: string): CommandDescriptor {
    const [firstArg, ...rawArgs] = args.trim().split(' ');

    if (!firstArg)
      throw new CommandLineParserException(`Command: ${firstArg} not entered`);

    const processedArgs = new Map<string, string>();

    for (const item of rawArgs) {
      if (!item) continue;

      const arrayStrings = item.split('=');

      processedArgs.set(arrayStrings[0], arrayStrings[1]);
    }

    return { name: firstArg, params: processedArgs };
  }
}
