import { Module } from '@nestjs/common';
import { BanksController } from './banks.controller';
import { BanksService } from './banks.service';

import { HelpersModule } from '../common/helpers/helpers.module';
// import { BankUsersModule } from '../bankUsers/bank-users.module';
// import { AccountsModule } from '../accounts/accounts.module';
// import { TransactionsModule } from '../transactions/transactions.module';
// import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    HelpersModule,
    // BankUsersModule,
    // AccountsModule,
    // TransactionsModule,
    // UsersModule,
  ],
  controllers: [BanksController],
  providers: [BanksService],
  exports: [BanksService],
})
export class BanksModule {}
