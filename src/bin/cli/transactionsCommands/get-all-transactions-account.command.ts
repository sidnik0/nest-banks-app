import { Injectable } from '@nestjs/common';
import { TransactionsService } from '../../transactions/transactions.service';
import { HelpersService } from '../../../common/helpers/helpers.service';
import { commands } from '../commands';
import { getAllTransactionsHelp } from '../helps';

@Injectable()
export class GetAllTransactionsAccountCommand {
  private readonly id = 'id';
  private readonly properties = [this.id];

  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly helpersService: HelpersService,
  ) {}

  async run(args: Array<string>): Promise<void> {
    if (args[0] === commands.help || !args[0]) {
      console.log(getAllTransactionsHelp);
      process.exit(0);
    }

    const accountId = this.helpersService.convertingArgs(args, this.properties);

    try {
      accountId[this.id] = this.parseId(accountId[this.id]);

      const user = await this.transactionsService.getByIdAccount(
        accountId[this.id],
      );

      console.log(user);
    } catch (e) {
      console.log(e.message);
      console.error('Internal error');
      process.exit(0);
    }
  }

  parseId(id: string): string {
    if (!id) {
      console.error('Account id not specified');
      process.exit(0);
    }

    return id;
  }
}
