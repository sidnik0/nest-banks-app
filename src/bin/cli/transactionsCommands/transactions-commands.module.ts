import { Module } from '@nestjs/common';
import { GetTransactionCommand } from './get-transaction.command';
import { CreateTransactionCommand } from './create-transaction.command';
import { GetAllTransactionsAccountCommand } from './get-all-transactions-account.command';

import { HelperModule } from '../../../common/helper/helper.module';
import { TransactionsModule } from '../../transactions/transactions.module';

@Module({
  imports: [HelperModule, TransactionsModule],
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
