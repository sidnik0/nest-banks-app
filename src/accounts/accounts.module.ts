import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';

import { HelpersModule } from '../common/helpers/helpers.module';

@Module({
  imports: [HelpersModule],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
