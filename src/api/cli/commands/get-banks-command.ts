import { CommandInterface } from '../interface/command.interface';

export class GetBanksCommand implements CommandInterface {
  async execute(): Promise<string> {
    return 'get-banks';
  }
}
