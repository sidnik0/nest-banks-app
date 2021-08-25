import { Injectable } from '@nestjs/common';
import { ConsoleExecutor } from './console-executor';
import { CommandDescriptor } from './command-descriptor';

@Injectable()
export class ConsoleInterpreter {
  constructor(
    private readonly commandDescriptor: CommandDescriptor,
    private readonly consoleExecutor: ConsoleExecutor,
  ) {}

  async interpretCommand(input: string): Promise<void> {
    const [commandArg, processedArgs] = ConsoleInterpreter.parseArgs(input);

    const creatorCommand = await this.commandDescriptor.getCommand(commandArg);

    const data = await this.consoleExecutor.executeCommand(
      creatorCommand,
      processedArgs,
    );

    console.log(data);
  }

  private static parseArgs(args: string): [string, { [i: string]: string }[]] {
    const [commandArg, ...rawArgs] = args.trim().split(' ');

    if (!rawArgs || !rawArgs.length)
      return [commandArg, [{ ['help']: 'help' }]];

    const processedArgs: { [i: string]: string }[] = [];

    for (const item of rawArgs) {
      const arrayStrings = item.split('=');

      if (
        arrayStrings.length !== 2 ||
        (arrayStrings[0] !== 'help' && arrayStrings[0] !== 'exit')
      )
        continue;

      processedArgs.push({
        [arrayStrings[0]]: arrayStrings[1] || arrayStrings[0],
      });
    }

    return [commandArg, processedArgs];
  }
}
