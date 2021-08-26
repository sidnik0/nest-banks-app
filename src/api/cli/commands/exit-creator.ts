import { CreatorCommand } from '../interface/creator-command';
import { CommandInterface } from '../interface/command.interface';
import { ExitCommand } from './exit-command';

export class ExitCreator extends CreatorCommand {
  factoryMethod(): CommandInterface {
    return new ExitCommand();
  }
}
