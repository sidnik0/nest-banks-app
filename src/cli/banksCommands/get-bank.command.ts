import { Command, CommandRunner, Option } from 'nest-commander';
import { BanksService } from '../../banks/banks.service';
import { HelpersService } from '../../common/helpers/helpers.service';

@Command({ name: 'get-bank', description: 'Get bank' })
export class GetBankCommand implements CommandRunner {
  private readonly id = 'id';
  private readonly properties = [this.id];

  constructor(
    private readonly banksService: BanksService,
    private readonly helpersService: HelpersService,
  ) {}

  async run(args: Array<string>, options: { id: string }): Promise<void> {
    const bankId = this.helpersService.convertingArgs(args, this.properties);

    try {
      const bank = await this.banksService.getById(
        bankId[this.id] || options.id,
      );

      console.log(bank);
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
