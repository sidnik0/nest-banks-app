import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

import { HelperModule } from '../../common/helper/helper.module';
import { AccountsModule } from '../accounts/accounts.module';
import { BanksModule } from '../banks/banks.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [HelperModule, AccountsModule, BanksModule, UsersModule],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
