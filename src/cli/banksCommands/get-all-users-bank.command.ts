import { Command, CommandRunner, Option } from 'nest-commander';
import { BanksService } from '../../banks/banks.service';
import { HelpersService } from '../../common/helpers/helpers.service';

@Command({
  name: 'get-all-banks-user',
  description: 'Get all bank users',
})
export class GetAllUsersBankCommand implements CommandRunner {
  private readonly id = 'id';
  private readonly properties = [this.id];

  constructor(
    private readonly banksService: BanksService,
    private readonly helpersService: HelpersService,
  ) {}

  async run(args: Array<string>, options: { id: string }): Promise<void> {
    const bankId = this.helpersService.convertingArgs(args, this.properties);

    try {
      const users = await this.banksService.getAllUsersByIdBank(
        bankId[this.id] || options.id,
      );

      console.log(users);
    } catch (e) {
      console.log(e.message);
      console.error('Internal error');
      process.exit(0);
    }
  }

  @Option({
    flags: '-i, id=<id>',
    description: 'Bank id',
  })
  parseId(id: string): string {
    if (!id) {
      console.error('Bank id not specified');
      process.exit(0);
    }

    return id;
  }
}
