import { CreatorCommand } from '../interface/creator-command';
import { CommandInterface } from '../interface/command.interface';
import { UpdateBankCommand } from './update-bank-command';

export class UpdateBankCreator extends CreatorCommand {
  factoryMethod(): CommandInterface {
    return new UpdateBankCommand();
  }
}
