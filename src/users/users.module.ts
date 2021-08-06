import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { HelpersModule } from '../common/helpers/helpers.module';
import { CurrentUsersOfBanksModule } from '../currentUsersOfBanks/current-users-of-banks.module';
import { AccountsModule } from '../accounts/accounts.module';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [
    HelpersModule,
    CurrentUsersOfBanksModule,
    AccountsModule,
    TransactionsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
