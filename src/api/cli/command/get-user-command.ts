import { CommandInterface } from '../interface/command.interface';

export class GetUserCommand implements CommandInterface {
  async execute(): Promise<string> {
    return 'get-user';
  }
}
