import { Injectable } from '@nestjs/common';
import { TransactionsService } from '../../transactions/transactions.service';
import { HelpersService } from '../../../common/helpers/helpers.service';
import { commands } from '../commands';
import { getTransactionHelp } from '../helps';

@Injectable()
export class GetTransactionCommand {
  private readonly id = 'id';
  private readonly properties = [this.id];

  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly helpersService: HelpersService,
  ) {}

  async run(args: Array<string>): Promise<void> {
    if (args[0] === commands.help || !args[0]) {
      console.log(getTransactionHelp);
      process.exit(0);
    }

    const transactionId = this.helpersService.convertingArgs(
      args,
      this.properties,
    );

    try {
      transactionId[this.id] = this.parseId(transactionId[this.id]);

      const user = await this.transactionsService.getById(
        transactionId[this.id],
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
      console.error('Transaction id not specified');
      process.exit(0);
    }

    return id;
  }
}
