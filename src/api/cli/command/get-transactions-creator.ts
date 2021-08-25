import { CreatorCommand } from '../interface/creator-command';
import { CommandInterface } from '../interface/command.interface';
import { GetTransactionsCommand } from './get-transactions-command';

export class GetTransactionsCreator extends CreatorCommand {
  factoryMethod(): CommandInterface {
    return new GetTransactionsCommand();
  }
}
