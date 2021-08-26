import { CommandInterface } from './command.interface';

export abstract class CreatorCommand {
  abstract factoryMethod(): CommandInterface;

  executeCommand(params: string[]): Promise<string> {
    const command = this.factoryMethod();

    return command.execute(params);
  }
}
