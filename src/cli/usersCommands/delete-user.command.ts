import { Command, CommandRunner, Option } from 'nest-commander';
import { UsersService } from '../../users/users.service';
import { HelpersService } from '../../common/helpers/helpers.service';

@Command({ name: 'delete-user', description: 'Delete user' })
export class DeleteUserCommand implements CommandRunner {
  private readonly id = 'id';
  private readonly properties = [this.id];

  constructor(
    private readonly usersService: UsersService,
    private readonly helpersService: HelpersService,
  ) {}

  async run(args: Array<string>, options: { id: string }): Promise<void> {
    const userId = this.helpersService.convertingArgs(args, this.properties);

    try {
      const user = await this.usersService.deleteById(
        userId[this.id] || options.id,
      );

      console.log(user);
    } catch (e) {
      console.log(e.message);
      console.error('Internal error');
      process.exit(0);
    }
  }

  @Option({
    flags: '-i, id=<id>',
    description: 'User id',
  })
  parseId(id: string): string {
    if (!id) {
      console.error('User id not specified');
      process.exit(0);
    }

    return id;
  }
}
