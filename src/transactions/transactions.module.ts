import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

import { HelpersModule } from '../common/helpers/helpers.module';
import { AccountsModule } from '../accounts/accounts.module';
import { BanksModule } from '../banks/banks.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [HelpersModule, AccountsModule, BanksModule, UsersModule],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
