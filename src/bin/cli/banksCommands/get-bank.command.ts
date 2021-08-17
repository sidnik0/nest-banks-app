import { Injectable } from '@nestjs/common';
import { BanksService } from '../../banks/banks.service';
import { HelpersService } from '../../../common/helpers/helpers.service';
import { commands } from '../commands';
import { getBankHelp } from '../helps';

@Injectable()
export class GetBankCommand {
  private readonly id = 'id';
  private readonly properties = [this.id];

  constructor(
    private readonly banksService: BanksService,
    private readonly helpersService: HelpersService,
  ) {}

  async run(args: Array<string>): Promise<void> {
    if (args[0] === commands.help || !args[0]) {
      console.log(getBankHelp);
      process.exit(0);
    }

    const bankId = this.helpersService.convertingArgs(args, this.properties);

    try {
      bankId[this.id] = this.parseId(bankId[this.id]);

      const bank = await this.banksService.getById(bankId[this.id]);

      console.log(bank);
    } catch (e) {
      console.log(e.message);
      console.error('Internal error');
      process.exit(0);
    }
  }

  parseId(id: string): string {
    if (!id) {
      console.error('Bank id not specified');
      process.exit(0);
    }

    return id;
  }
}
