import { Injectable } from '@nestjs/common';
import { TransactionsService } from '../../transactions/transactions.service';
import { HelpersService } from '../../common/helpers/helpers.service';

import { CreateTransactionDto } from '../../transactions/dto/create-transaction.dto';
import { commands } from '../commands';
import { createTransactionHelp } from '../helps';

@Injectable()
export class CreateTransactionCommand {
  private readonly fromAccountId = 'fromAccountId';
  private readonly toAccountId = 'toAccountId';
  private readonly value = 'value';
  private readonly properties = [
    this.fromAccountId,
    this.toAccountId,
    this.value,
  ];

  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly helpersService: HelpersService,
  ) {}

  async run(args: Array<string>): Promise<void> {
    if (args[0] === commands.help || !args[0]) {
      console.log(createTransactionHelp);
      process.exit(0);
    }

    const transaction = this.helpersService.convertingArgs(
      args,
      this.properties,
    );

    try {
      transaction[this.fromAccountId] = this.parseFromAccountId(
        transaction[this.fromAccountId],
      );

      transaction[this.toAccountId] = this.parseToAccountId(
        transaction[this.toAccountId],
      );

      transaction[this.value] = this.parseValue(transaction[this.value]);

      const currentTransaction = await this.transactionsService.create(
        transaction as CreateTransactionDto,
      );

      console.log(currentTransaction);
    } catch (e) {
      console.log(e.message);
      console.error('Internal error');
      process.exit(0);
    }
  }

  parseFromAccountId(fromAccountId: string): string {
    if (!fromAccountId) {
      console.error('User id not specified');
      process.exit(0);
    }

    return fromAccountId;
  }

  parseToAccountId(toAccountId: string): string {
    if (!toAccountId) {
      console.error('User id not specified');
      process.exit(0);
    }

    return toAccountId;
  }

  parseValue(value: string): number {
    const val = Number.parseInt(value);

    return val || 0;
  }
}
