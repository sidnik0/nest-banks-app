import { CreatorCommand } from '../interface/creator-command';
import { CommandInterface } from '../interface/command.interface';
import { UpdateAccountCommand } from './update-account-command';

export class UpdateAccountCreator extends CreatorCommand {
  factoryMethod(): CommandInterface {
    return new UpdateAccountCommand();
  }
}
