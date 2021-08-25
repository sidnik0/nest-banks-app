import { CommandInterface } from '../interface/command.interface';

export class DeleteUserCommand implements CommandInterface {
  async execute(): Promise<string> {
    return 'delete-user';
  }
}
