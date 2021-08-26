import { CommandInterface } from '../interface/command.interface';

export class GetUsersCommand implements CommandInterface {
  async execute(): Promise<string> {
    return 'get-users';
  }
}
