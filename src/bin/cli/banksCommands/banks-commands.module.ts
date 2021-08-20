import { Module } from '@nestjs/common';
import { DeleteBankCommand } from './delete-bank.command';
import { GetBankCommand } from './get-bank.command';
import { GetBanksCommand } from './get-banks.command';
import { UpdateBankCommand } from './update-bank.command';

import { HelperModule } from '../../../common/helper/helper.module';
import { BanksModule } from '../../banks/banks.module';

@Module({
  imports: [HelperModule, BanksModule],
  providers: [
    DeleteBankCommand,
    GetBankCommand,
    GetBanksCommand,
    UpdateBankCommand,
  ],
  exports: [
    DeleteBankCommand,
    GetBankCommand,
    GetBanksCommand,
    UpdateBankCommand,
  ],
})
export class BanksCommandsModule {}
