import { Command, CommandRunner, Option } from 'nest-commander';
import { BankUsersService } from '../../bankUsers/bank-users.service';
import { HelpersService } from '../../common/helpers/helpers.service';

@Command({
  name: 'get-all-user-banks',
  description: 'Get all banks the user exists',
})
export class GetAllBanksUserCommand implements CommandRunner {
  private readonly id = 'id';
  private readonly properties = [this.id];

  constructor(
    private readonly bankUsersService: BankUsersService,
    private readonly helpersService: HelpersService,
  ) {}

  async run(args: Array<string>, options: { id: string }): Promise<void> {
    const userId = this.helpersService.convertingArgs(args, this.properties);

    try {
      const banks = await this.bankUsersService.getBanksByIdUser(
        userId[this.id] || options.id,
      );

      console.log(banks);
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
