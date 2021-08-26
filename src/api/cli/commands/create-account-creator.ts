import { CreatorCommand } from '../interface/creator-command';
import { CommandInterface } from '../interface/command.interface';
import { CreateAccountCommand } from './create-account-command';

export class CreateAccountCreator extends CreatorCommand {
  factoryMethod(): CommandInterface {
    return new CreateAccountCommand();
  }
}
