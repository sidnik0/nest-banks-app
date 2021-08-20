import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { HelperModule } from '../../common/helper/helper.module';
// import { BankUsersModule } from '../bankUsers/bank-users.module';
// import { AccountsModule } from '../accounts/accounts.module';
// import { TransactionsModule } from '../transactions/transactions.module';
// import { BanksModule } from '../banks/banks.module';

@Module({
  imports: [
    HelperModule,
    // BankUsersModule,
    // AccountsModule,
    // TransactionsModule,
    // BanksModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
