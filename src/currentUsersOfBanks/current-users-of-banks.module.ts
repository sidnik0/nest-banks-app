import { Module } from '@nestjs/common';
import { CurrentUsersOfBanksService } from './current-users-of-banks.service';

import { AccountsModule } from '../accounts/accounts.module';
import { HelpersModule } from '../common/helpers/helpers.module';

@Module({
  imports: [AccountsModule, HelpersModule],
  providers: [CurrentUsersOfBanksService],
  exports: [CurrentUsersOfBanksService],
})
export class CurrentUsersOfBanksModule {}
