import { CreatorCommand } from '../interface/creator-command';
import { CommandInterface } from '../interface/command.interface';
import { GetAccountCommand } from './get-account-command';

export class GetAccountCreator extends CreatorCommand {
  factoryMethod(): CommandInterface {
    return new GetAccountCommand();
  }
}
