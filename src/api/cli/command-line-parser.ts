import { Injectable } from '@nestjs/common';
import { CommandDescriptor } from './interface/command-descriptor';
import { CommandLineParserException } from '../../common/exseption/command-line-parser-exception';

@Injectable()
export class CommandLineParser {
  parseInput(args: string): CommandDescriptor {
    const [firstArg, ...rawArgs] = args.trim().split(' ');

    if (!firstArg) throw new CommandLineParserException('unknown commands');

    const processedArgs = [];

    for (const item of rawArgs) {
      if (!item) continue;

      processedArgs.push(item);
    }

    return { name: firstArg, params: processedArgs };
  }
}
