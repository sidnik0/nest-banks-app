import { CommandInterface } from '../interface/command.interface';

export class DeleteBankCommand implements CommandInterface {
  async execute(): Promise<string> {
    return 'delete-bank';
  }
}
