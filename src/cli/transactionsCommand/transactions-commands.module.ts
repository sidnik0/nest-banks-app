import { Module } from '@nestjs/common';
import { CreateTransactionCommand } from './create-transaction.command';
import { GetAllTransactionsAccountCommand } from './get-all-transactions-account.command';
import { GetTransactionCommand } from './get-transaction.command';

import { HelpersModule } from '../../common/helpers/helpers.module';
import { TransactionsModule } from '../../transactions/transactions.module';

@Module({
  imports: [HelpersModule, TransactionsModule],
  providers: [
    CreateTransactionCommand,
    GetAllTransactionsAccountCommand,
    GetTransactionCommand,
  ],
})
export class TransactionsCommandsModule {}
