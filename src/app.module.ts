import { Module } from '@nestjs/common';
import { BanksModule } from './banks/banks.module';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CurrentUsersOfBanksModule } from './currentUsersOfBanks/current-users-of-banks.module';

@Module({
  imports: [
    BanksModule,
    UsersModule,
    AccountsModule,
    TransactionsModule,
    CurrentUsersOfBanksModule,
  ],
})
export class AppModule {}
