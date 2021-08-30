import * as readline from 'readline';
import { Injectable } from '@nestjs/common';
import { CommandExecutor } from './command-executor';
import { CommandLineParser } from './command-line-parser';
import { ConsoleCommandResultViewer } from './console-command-result-viewer';

@Injectable()
export class ConsoleInterpreter {
  private readonly rl;

  constructor(
    private readonly commandLineParser: CommandLineParser,
    private readonly consoleExecutor: CommandExecutor,
    private readonly consoleCommandResultViewer: ConsoleCommandResultViewer,
  ) {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  async run(): Promise<void> {
    this.rl.prompt();

    this.rl.on('line', this.lineHandler.bind(this));

    this.rl.on('close', () => console.log('app close'));
  }

  private async lineHandler(input) {
    try {
      const commandDescriptor = this.commandLineParser.parseInput(input);

      const commandResult = await this.consoleExecutor.executeCommand(
        commandDescriptor,
      );

      if (commandResult.onExit) this.rl.close();

      const resultString =
        this.consoleCommandResultViewer.parseCommandResult(commandResult);

      console.log(resultString);

      this.rl.prompt();
    } catch (e) {
      const resultError = this.consoleCommandResultViewer.parseError(e);

      if (typeof resultError === 'string') {
        console.log(resultError);

        this.rl.prompt();
      } else {
        console.log(e);

        this.rl.close();
      }
    }
  }
}
