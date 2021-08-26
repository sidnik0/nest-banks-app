import { CommandInterface } from '../interface/command.interface';

export class GetAllTransactionsByAccountCommand implements CommandInterface {
  async execute(): Promise<string> {
    return 'get-all-transactions-by-account';
  }
}
