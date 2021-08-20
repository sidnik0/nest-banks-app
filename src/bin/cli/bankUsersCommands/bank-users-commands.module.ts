import { Module } from '@nestjs/common';
import { BankRegistrationCommand } from './bank-registration.command';
import { GetAllBanksUserCommand } from './get-all-banks-user.command';
import { GetAllUsersBankCommand } from './get-all-users-bank.command';

import { HelperModule } from '../../../common/helper/helper.module';
import { BankUsersModule } from '../../bankUsers/bank-users.module';

@Module({
  imports: [HelperModule, BankUsersModule],
  providers: [
    BankRegistrationCommand,
    GetAllBanksUserCommand,
    GetAllUsersBankCommand,
  ],
  exports: [
    BankRegistrationCommand,
    GetAllBanksUserCommand,
    GetAllUsersBankCommand,
  ],
})
export class BankUsersCommandsModule {}
