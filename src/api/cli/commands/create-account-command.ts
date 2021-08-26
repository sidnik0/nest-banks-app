import { CommandInterface } from '../interface/command.interface';

export class CreateAccountCommand implements CommandInterface {
  async execute(): Promise<string> {
    return 'create-account';
  }
}
