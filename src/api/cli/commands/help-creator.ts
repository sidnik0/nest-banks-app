import { CreatorCommand } from '../interface/creator-command';
import { CommandInterface } from '../interface/command.interface';
import { HelpCommand } from './help-command';

export class HelpCreator extends CreatorCommand {
  factoryMethod(): CommandInterface {
    return new HelpCommand();
  }
}
