import { CreatorCommand } from '../interface/creator-command';
import { CommandInterface } from '../interface/command.interface';
import { CreateBankCommand } from './create-bank-command';

export class CreateBankCreator extends CreatorCommand {
  factoryMethod(): CommandInterface {
    return new CreateBankCommand();
  }
}
