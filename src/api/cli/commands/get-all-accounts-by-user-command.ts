import { CommandInterface } from '../interface/command.interface';

export class GetAllAccountsByUserCommand implements CommandInterface {
  async execute(): Promise<string> {
    return 'get-all-accounts-by-user';
  }
}
