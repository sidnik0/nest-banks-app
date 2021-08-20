import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';

import { HelperModule } from '../../common/helper/helper.module';

@Module({
  imports: [HelperModule],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
