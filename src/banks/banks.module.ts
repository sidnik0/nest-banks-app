import { Module } from '@nestjs/common';
import { BanksController } from './banks.controller';
import { BanksService } from './banks.service';
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
  controllers: [BanksController],
  providers: [BanksService],
  exports: [BanksService],
})
export class BanksModule {}
