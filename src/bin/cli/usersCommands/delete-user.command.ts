import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { RIdHelper } from '../../../common/helper/r-id.helper';
import { commands } from '../commands';
import { deleteUserHelp } from '../helps';

@Injectable()
export class DeleteUserCommand {
  private readonly id = 'id';
  private readonly properties = [this.id];

  constructor(
    private readonly usersService: UsersService,
    private readonly helpersService: RIdHelper,
  ) {}

  async run(args: Array<string>): Promise<void> {
    if (args[0] === commands.help || !args[0]) {
      console.log(deleteUserHelp);
      process.exit(0);
    }

    const userId = this.helpersService.convertingArgs(args, this.properties);

    try {
      userId[this.id] = this.parseId(userId[this.id]);

      const user = await this.usersService.deleteById(userId[this.id]);

      console.log(user);
    } catch (e) {
      console.log(e.message);
      console.error('Internal error');
      process.exit(0);
    }
  }

  parseId(id: string): string {
    if (!id) {
      console.error('User id not specified');
      process.exit(0);
    }

    return id;
  }
}
