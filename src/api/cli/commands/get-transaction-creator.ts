import { CreatorCommand } from '../interface/creator-command';
import { CommandInterface } from '../interface/command.interface';
import { GetTransactionCommand } from './get-transaction-command';

export class GetTransactionCreator extends CreatorCommand {
  factoryMethod(): CommandInterface {
    return new GetTransactionCommand();
  }
}
