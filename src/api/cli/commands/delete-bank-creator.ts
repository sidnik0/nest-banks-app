import { CreatorCommand } from '../interface/creator-command';
import { CommandInterface } from '../interface/command.interface';
import { DeleteBankCommand } from './delete-bank-command';

export class DeleteBankCreator extends CreatorCommand {
  factoryMethod(): CommandInterface {
    return new DeleteBankCommand();
  }
}
