import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { commands } from '../commands';
import { getUsersHelp } from '../helps';

@Injectable()
export class GetUsersCommand {
  constructor(private readonly usersService: UsersService) {}

  async run(args: Array<string>): Promise<void> {
    try {
      if (args[0] === commands.help || !args[0]) {
        console.log(getUsersHelp);
        process.exit(0);
      }

      const users = await this.usersService.get();

      console.log(users);
    } catch (e) {
      console.log(e.message);
      console.error('Internal error');
      process.exit(0);
    }
  }
}
