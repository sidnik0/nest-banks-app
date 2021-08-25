import { CreatorCommand } from '../interface/creator-command';
import { CommandInterface } from '../interface/command.interface';
import { CreateTransactionCommand } from './create-transaction-command';

export class CreateTransactionCreator extends CreatorCommand {
  factoryMethod(): CommandInterface {
    return new CreateTransactionCommand();
  }
}
