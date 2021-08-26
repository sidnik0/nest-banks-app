import { CreatorCommand } from '../interface/creator-command';
import { CommandInterface } from '../interface/command.interface';
import { GetAllAccountsByBankCommand } from './get-all-accounts-by-bank-command';

export class GetAllAccountsByBankCreator extends CreatorCommand {
  factoryMethod(): CommandInterface {
    return new GetAllAccountsByBankCommand();
  }
}
