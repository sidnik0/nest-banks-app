import { Module } from '@nestjs/common';
import { CurrentUsersOfBanksController } from './current-users-of-banks.controller';
import { CurrentUsersOfBanksService } from './current-users-of-banks.service';
import { HelpersModule } from '../common/helpers/helpers.module';

@Module({
  imports: [HelpersModule],
  controllers: [CurrentUsersOfBanksController],
  providers: [CurrentUsersOfBanksService],
})
export class CurrentUsersOfBanksModule {}
