import { Injectable } from '@nestjs/common';
import * as readline from 'readline';
import { ConsoleInterpreter } from './console-interpreter';

@Injectable()
export class CliService {
  constructor(private readonly consoleInterpreter: ConsoleInterpreter) {}

  async runApp(): Promise<void> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.prompt();

    rl.on('line', async (input) => {
      await this.consoleInterpreter.interpretCommand(input);

      rl.prompt();
    });

    rl.on('close', () => {
      console.log('app close');
    });
  }
}
