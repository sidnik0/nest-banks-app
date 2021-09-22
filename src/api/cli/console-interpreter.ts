import * as readline from 'readline';
import { Injectable, Logger } from '@nestjs/common';
import { CommandExecutor } from '../command/command-executor';
import { ConsoleLineParser } from './console-line-parser';
import { ConsoleCommandResultViewer } from './console-command-result-viewer';

@Injectable()
export class ConsoleInterpreter {
  private readonly rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  private readonly logger = new Logger('ConsoleInterpreter');

  constructor(
    private readonly commandExecutor: CommandExecutor,
    private readonly consoleLineParser: ConsoleLineParser,
    private readonly consoleCommandResultViewer: ConsoleCommandResultViewer,
  ) {}

  async run(): Promise<void> {
    this.rl.prompt();

    this.rl.on('line', this.lineHandler.bind(this));

    this.rl.on('close', function () {
      process.exit(0);
    });
  }

  private async lineHandler(input: string) {
    try {
      const commandDescriptor = this.consoleLineParser.parseInput(input);

      const commandResult = await this.commandExecutor.executeCommand(commandDescriptor);

      if (commandResult.exit) {
        this.rl.close();
      }

      const resultString = this.consoleCommandResultViewer.parseCommandResult(commandResult);

      console.log(resultString);

      this.rl.prompt();
    } catch (e) {
      const resultError = this.consoleCommandResultViewer.parseError(e);

      if (typeof resultError === 'string') {
        console.error(`Errors: ${resultError}`);

        this.rl.prompt();
      } else {
        console.error(`Unknown error: ${resultError.message}`, resultError.stack);

        this.rl.close();
      }
    }
  }
}
