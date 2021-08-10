import { Command, CommandRunner, Option } from 'nest-commander';
import { UsersService } from '../../users/users.service';
import { HelpersService } from '../../common/helpers/helpers.service';

import { CreateTransactionDto } from '../../transactions/dto/create-transaction.dto';

@Command({ name: 'create-transaction', description: 'Create transaction' })
export class CreateTransactionCommand implements CommandRunner {
  private readonly fromAccountId = 'fromAccountId';
  private readonly toAccountId = 'toAccountId';
  private readonly value = 'value';
  private readonly properties = [
    this.fromAccountId,
    this.toAccountId,
    this.value,
  ];

  constructor(
    private readonly usersService: UsersService,
    private readonly helpersService: HelpersService,
  ) {}

  async run(args: Array<string>, options: CreateTransactionDto): Promise<void> {
    const transaction = this.helpersService.convertingArgs(
      args,
      this.properties,
    );

    if (!options[this.fromAccountId]) {
      transaction[this.fromAccountId] = this.parseFromAccountId(
        transaction[this.fromAccountId],
      );
    }

    if (!options[this.toAccountId]) {
      transaction[this.toAccountId] = this.parseToAccountId(
        transaction[this.toAccountId],
      );
    }

    if (!options[this.value]) {
      transaction[this.value] = this.parseValue(transaction[this.value]);
    }

    try {
      const currentTransaction = await this.usersService.transactionRequest({
        ...transaction,
        ...options,
      });

      console.log(currentTransaction);
    } catch (e) {
      console.log(e.message);
      console.error('Internal error');
      process.exit(0);
    }
  }

  @Option({
    flags: '-f, fromAccountId=<fromAccountId>',
    description: 'From account',
  })
  parseFromAccountId(fromAccountId: string): string {
    if (!fromAccountId) {
      console.error('User id not specified');
      process.exit(0);
    }

    return fromAccountId;
  }

  @Option({
    flags: '-t, toAccountId=<toAccountId>',
    description: 'To account',
  })
  parseToAccountId(toAccountId: string): string {
    if (!toAccountId) {
      console.error('User id not specified');
      process.exit(0);
    }

    return toAccountId;
  }

  @Option({
    flags: '-v, value=<value>',
    description: 'value',
  })
  parseValue(value: string): number {
    const val = Number.parseInt(value);

    return val || 0;
  }
}
