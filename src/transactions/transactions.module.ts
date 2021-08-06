import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

import { HelpersModule } from '../common/helpers/helpers.module';
import { AccountsModule } from '../accounts/accounts.module';

@Module({
  imports: [HelpersModule, AccountsModule],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
