import { Module } from '@nestjs/common';
import { CreateAccountCommand } from './create-account.command';
import { GetAccountCommand } from './get-account.command';
import { GetAllAccountsUserCommand } from './get-all-accounts-user.command';

import { HelpersModule } from '../../../common/helpers/helpers.module';
import { AccountsModule } from '../../accounts/accounts.module';

@Module({
  imports: [HelpersModule, AccountsModule],
  providers: [
    CreateAccountCommand,
    GetAccountCommand,
    GetAllAccountsUserCommand,
  ],
  exports: [CreateAccountCommand, GetAccountCommand, GetAllAccountsUserCommand],
})
export class AccountsCommandsModule {}
