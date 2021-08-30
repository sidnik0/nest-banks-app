import * as readline from 'readline';
import { Injectable } from '@nestjs/common';
import { CommandExecutor } from './command-executor';
import { CommandLineParser } from './command-line-parser';
import { CommandLineParserException } from '../../common/exseption/command-line-parser-exception';
import { ParserException } from '../../common/exseption/parser-exception';
import { ValidatorException } from '../../common/exseption/validator-exception';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class ConsoleInterpreter {
  private readonly rl;
  private commandLineParser: CommandLineParser;
  private consoleExecutor: CommandExecutor;

  constructor(private readonly moduleRef: ModuleRef) {
    this.commandLineParser = this.moduleRef.get(CommandLineParser);
    this.consoleExecutor = this.moduleRef.get(CommandExecutor);

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  async run(): Promise<void> {
    this.rl.prompt();

    this.rl.on('line', this.lineHandler);

    this.rl.on('close', () => console.log('app close'));
  }

  private async lineHandler(input) {
    try {
      const commandDescriptor = this.commandLineParser.parseInput(input);

      const data = await this.consoleExecutor.executeCommand(commandDescriptor);

      switch (data.message) {
        case 'OK':
          const result = this.parseResultToString(data.result);
          console.log(result);
          this.rl.prompt();

          break;
        case 'HELP':
          console.log(data.result);
          this.rl.prompt();

          break;
        case 'EXIT':
          this.rl.close();
        default:
          throw new Error(`Unknown message: ${data.message}`);
      }
    } catch (e) {
      if (
        e instanceof CommandLineParserException ||
        e instanceof ParserException ||
        e instanceof ValidatorException
      ) {
        console.log(e.message);

        this.rl.prompt();
      } else {
        console.log(e);
        this.rl.close();
      }
    }
  }

  private parseResultToString(result: Record<string, any>): string {
    let string = '';

    for (const key of Object.keys(result)) {
      string += `${key}: ${result[key]}\n`;
    }

    return string;
  }
}
