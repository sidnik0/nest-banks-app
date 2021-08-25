import { CommandInterface } from '../interface/command.interface';

export class CreateUserCommand implements CommandInterface {
  async execute(): Promise<string> {
    return 'create-user';
  }
}
