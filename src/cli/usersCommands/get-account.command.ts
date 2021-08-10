import { Command, CommandRunner, Option } from 'nest-commander';
import { UsersService } from '../../users/users.service';
import { HelpersService } from '../../common/helpers/helpers.service';

@Command({ name: 'get-account', description: 'Get account' })
export class GetAccountCommand implements CommandRunner {
  private readonly id = 'id';
  private readonly properties = [this.id];

  constructor(
    private readonly usersService: UsersService,
    private readonly helpersService: HelpersService,
  ) {}

  async run(args: Array<string>, options: { id: string }): Promise<void> {
    const account = this.helpersService.convertingArgs(args, this.properties);

    try {
      const currentAccount = await this.usersService.getAccountById(
        account[this.id] || options.id,
      );

      console.log(currentAccount);
    } catch (e) {
      console.log(e.message);
      console.error('Internal error');
      process.exit(0);
    }
  }

  @Option({
    flags: '-i, id=<id>',
    description: 'Account id',
  })
  parseId(id: string): string {
    if (!id) {
      console.error('Account id not specified');
      process.exit(0);
    }

    return id;
  }
}
