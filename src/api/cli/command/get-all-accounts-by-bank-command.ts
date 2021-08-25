import { CommandInterface } from '../interface/command.interface';

export class GetAllAccountsByBankCommand implements CommandInterface {
  async execute(): Promise<string> {
    return 'get-all-accounts-by-bank';
  }
}
