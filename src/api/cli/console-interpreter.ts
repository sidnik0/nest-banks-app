import * as readline from 'readline';
import { Injectable } from '@nestjs/common';
import { CommandExecutor } from './command-executor';
import { CommandLineParser } from './command-line-parser';
import { CommandLineParserException } from '../../common/exseption/command-line-parser-exception';

@Injectable()
export class ConsoleInterpreter {
  constructor(
    private readonly consoleExecutor: CommandExecutor,
    private readonly commandLineParser: CommandLineParser,
  ) {}

  async run(): Promise<void> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.prompt();

    rl.on('line', async (input) => {
      try {
        const commandDescriptor = this.commandLineParser.parseInput(input);

        const data = await this.consoleExecutor.executeCommand(
          commandDescriptor,
        );

        console.log(data);

        rl.prompt();
      } catch (e) {
        if (e instanceof CommandLineParserException) {
          console.log(e.message);

          rl.prompt();
        } else {
          console.log(e);
          rl.close();
        }
      }
    });

    rl.on('close', () => {
      console.log('app close');
    });
  }
}
