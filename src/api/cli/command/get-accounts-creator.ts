import { CreatorCommand } from '../interface/creator-command';
import { CommandInterface } from '../interface/command.interface';
import { GetAccountsCommand } from './get-accounts-command';

export class GetAccountsCreator extends CreatorCommand {
  factoryMethod(): CommandInterface {
    return new GetAccountsCommand();
  }
}
