import { CommandInterface } from '../interface/command.interface';

export class UpdateUserCommand implements CommandInterface {
  async execute(): Promise<string> {
    return 'update-user';
  }
}
