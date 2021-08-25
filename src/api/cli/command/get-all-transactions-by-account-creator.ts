import { CreatorCommand } from '../interface/creator-command';
import { CommandInterface } from '../interface/command.interface';
import { GetAllTransactionsByAccountCommand } from './get-all-transactions-by-account-command';

export class GetAllTransactionsByAccountCreator extends CreatorCommand {
  factoryMethod(): CommandInterface {
    return new GetAllTransactionsByAccountCommand();
  }
}
