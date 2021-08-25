import { CommandInterface } from './command.interface';

export abstract class CreatorCommand {
  abstract factoryMethod(): CommandInterface;

  create(params): Promise<string> {
    const command = this.factoryMethod();

    return command.execute(params);
  }
}
