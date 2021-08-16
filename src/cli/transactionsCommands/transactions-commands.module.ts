import { Module } from '@nestjs/common';
import { GetTransactionCommand } from './get-transaction.command';
import { CreateTransactionCommand } from './create-transaction.command';
import { GetAllTransactionsAccountCommand } from './get-all-transactions-account.command';

import { HelpersModule } from '../../common/helpers/helpers.module';
import { TransactionsModule } from '../../transactions/transactions.module';

@Module({
  imports: [HelpersModule, TransactionsModule],
  providers: [
    GetTransactionCommand,
    CreateTransactionCommand,
    GetAllTransactionsAccountCommand,
  ],
  exports: [
    GetTransactionCommand,
    CreateTransactionCommand,
    GetAllTransactionsAccountCommand,
  ],
})
export class TransactionsCommandsModule {}
