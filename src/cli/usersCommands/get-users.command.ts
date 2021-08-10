import { Command, CommandRunner } from 'nest-commander';
import { UsersService } from '../../users/users.service';

@Command({ name: 'get-users', description: 'Get all users' })
export class GetUsersCommand implements CommandRunner {
  constructor(private readonly usersService: UsersService) {}

  async run(): Promise<void> {
    try {
      const users = await this.usersService.get();

      console.log(users);
    } catch (e) {
      console.log(e.message);
      console.error('Internal error');
      process.exit(0);
    }
  }
}
