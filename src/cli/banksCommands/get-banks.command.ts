import { Injectable } from '@nestjs/common';
import { BanksService } from '../../banks/banks.service';
import { commands } from '../commands';
import { getBanksHelp } from '../helps';

@Injectable()
export class GetBanksCommand {
  constructor(private readonly banksService: BanksService) {}

  async run(args: Array<string>): Promise<void> {
    if (args[0] === commands.help || !args[0]) {
      console.log(getBanksHelp);
      process.exit(0);
    }

    try {
      const banks = await this.banksService.get();

      console.log(banks);
    } catch (e) {
      console.log(e.message);
      console.error('Internal error');
      process.exit(0);
    }
  }
}
