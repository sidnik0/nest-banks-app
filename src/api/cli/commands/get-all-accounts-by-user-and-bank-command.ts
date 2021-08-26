import { CommandInterface } from '../interface/command.interface';

export class GetAllAccountsByUserAndBankCommand implements CommandInterface {
  async execute(): Promise<string> {
    return 'get-all-accounts-by-user-and-bank';
  }
}
