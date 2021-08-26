import { CreatorCommand } from '../interface/creator-command';
import { CommandInterface } from '../interface/command.interface';
import { GetAllAccountsByUserAndBankCommand } from './get-all-accounts-by-user-and-bank-command';

export class GetAllAccountsByUserAndBankCreator extends CreatorCommand {
  factoryMethod(): CommandInterface {
    return new GetAllAccountsByUserAndBankCommand();
  }
}
