import { Module } from '@nestjs/common';
import { BankUsersService } from './bank-users.service';

import { AccountsModule } from '../accounts/accounts.module';
import { HelperModule } from '../../common/helper/helper.module';
import { UsersModule } from '../users/users.module';
import { BanksModule } from '../banks/banks.module';

@Module({
  imports: [AccountsModule, HelperModule, UsersModule, BanksModule],
  providers: [BankUsersService],
  exports: [BankUsersService],
})
export class BankUsersModule {}
