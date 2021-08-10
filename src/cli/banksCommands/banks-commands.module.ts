import { Module } from '@nestjs/common';
import { DeleteBankCommand } from './delete-bank.command';
import { GetAllUsersBankCommand } from './get-all-users-bank.command';
import { GetBankCommand } from './get-bank.command';
import { GetBanksCommand } from './get-banks.command';
import { UpdateBankCommand } from './update-bank.command';

import { HelpersModule } from '../../common/helpers/helpers.module';
import { BanksModule } from '../../banks/banks.module';

@Module({
  imports: [HelpersModule, BanksModule],
  providers: [
    DeleteBankCommand,
    GetAllUsersBankCommand,
    GetBankCommand,
    GetBanksCommand,
    UpdateBankCommand,
  ],
})
export class BanksCommandsModule {}