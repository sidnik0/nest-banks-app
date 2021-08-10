import { Command, CommandRunner, Option } from 'nest-commander';
import { UsersService } from '../../users/users.service';
import { HelpersService } from '../../common/helpers/helpers.service';

@Command({ name: 'get-transaction', description: 'Get transaction' })
export class GetTransactionCommand implements CommandRunner {
  private readonly id = 'id';
  private readonly properties = [this.id];

  constructor(
    private readonly usersService: UsersService,
    private readonly helpersService: HelpersService,
  ) {}

  async run(args: Array<string>, options: { id: string }): Promise<void> {
    const userId = this.helpersService.convertingArgs(args, this.properties);

    try {
      const user = await this.usersService.getTransactionById(
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
    description: 'Transaction id',
  })
  parseId(id: string): string {
    if (!id) {
      console.error('Transaction id not specified');
      process.exit(0);
    }

    return id;
  }
}
