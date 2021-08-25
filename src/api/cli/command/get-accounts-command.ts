import { CommandInterface } from '../interface/command.interface';

export class GetAccountsCommand implements CommandInterface {
  async execute(): Promise<string> {
    return 'get-accounts';
  }
}
