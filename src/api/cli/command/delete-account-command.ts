import { CommandInterface } from '../interface/command.interface';

export class DeleteAccountCommand implements CommandInterface {
  async execute(): Promise<string> {
    return 'delete-account';
  }
}
