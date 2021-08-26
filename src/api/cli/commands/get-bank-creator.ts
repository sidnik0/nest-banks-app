import { CreatorCommand } from '../interface/creator-command';
import { CommandInterface } from '../interface/command.interface';
import { GetBankCommand } from './get-bank-command';

export class GetBankCreator extends CreatorCommand {
  factoryMethod(): CommandInterface {
    return new GetBankCommand();
  }
}
