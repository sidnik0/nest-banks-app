import { CommandInterface } from '../interface/command.interface';

export class GetBankCommand implements CommandInterface {
  async execute(): Promise<string> {
    return 'get-bank';
  }
}
