import { CommandInterface } from '../interface/command.interface';

export class UpdateBankCommand implements CommandInterface {
  async execute(): Promise<string> {
    return 'update-bank';
  }
}
