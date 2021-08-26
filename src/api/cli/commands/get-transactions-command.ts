import { CommandInterface } from '../interface/command.interface';

export class GetTransactionsCommand implements CommandInterface {
  async execute(): Promise<string> {
    return 'get-transactions';
  }
}
