import { Module } from '@nestjs/common';
import { BanksModule } from './banks/banks.module';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [BanksModule, UsersModule, AccountsModule, TransactionsModule],
})
export class AppModule {}
