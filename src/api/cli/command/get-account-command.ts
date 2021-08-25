import { CommandInterface } from '../interface/command.interface';

export class GetAccountCommand implements CommandInterface {
  async execute(): Promise<string> {
    return 'get-account';
  }
}
