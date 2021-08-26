import { CommandInterface } from '../interface/command.interface';

export class CreateTransactionCommand implements CommandInterface {
  async execute(): Promise<string> {
    return 'create-transaction';
  }
}
