import { Module } from '@nestjs/common';
import { CreateAccountCommand } from './create-account.command';
import { GetAccountCommand } from './get-account.command';
import { GetAllAccountsUserCommand } from './get-all-accounts-user.command';

import { HelperModule } from '../../../common/helper/helper.module';
import { AccountsModule } from '../../accounts/accounts.module';

@Module({
  imports: [HelperModule, AccountsModule],
  providers: [
    CreateAccountCommand,
    GetAccountCommand,
    GetAllAccountsUserCommand,
  ],
  exports: [CreateAccountCommand, GetAccountCommand, GetAllAccountsUserCommand],
})
export class AccountsCommandsModule {}
