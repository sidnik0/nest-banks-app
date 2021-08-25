import { CommandInterface } from '../interface/command.interface';

export class UpdateAccountCommand implements CommandInterface {
  async execute(): Promise<string> {
    return 'update-account';
  }
}
