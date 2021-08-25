import { CommandInterface } from '../interface/command.interface';

export class GetTransactionCommand implements CommandInterface {
  async execute(): Promise<string> {
    return 'get-transaction';
  }
}
