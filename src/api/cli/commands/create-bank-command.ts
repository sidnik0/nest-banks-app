import { CommandInterface } from '../interface/command.interface';

export class CreateBankCommand implements CommandInterface {
  async execute(): Promise<string> {
    return 'create-bank';
  }
}
