import { Module } from '@nestjs/common';
import { BankRegistrationCommand } from './bank-registration.command';
import { GetAllBanksUserCommand } from './get-all-banks-user.command';
import { GetAllUsersBankCommand } from './get-all-users-bank.command';

import { HelpersModule } from '../../common/helpers/helpers.module';
import { BankUsersModule } from '../../bankUsers/bank-users.module';

@Module({
  imports: [HelpersModule, BankUsersModule],
  providers: [
    BankRegistrationCommand,
    GetAllBanksUserCommand,
    GetAllUsersBankCommand,
  ],
})
export class BankUsersCommandModule {}
