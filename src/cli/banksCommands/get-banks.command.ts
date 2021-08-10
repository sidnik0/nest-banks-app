import { Command, CommandRunner } from 'nest-commander';
import { BanksService } from '../../banks/banks.service';

@Command({ name: 'get-banks', description: 'Get all banks' })
export class GetBanksCommand implements CommandRunner {
  constructor(private readonly banksService: BanksService) {}

  async run(): Promise<void> {
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
