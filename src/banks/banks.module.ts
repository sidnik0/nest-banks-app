import { Module } from '@nestjs/common';
import { BanksController } from './banks.controller';
import { BanksService } from './banks.service';
import { HelpersModule } from '../common/helpers/helpers.module';

@Module({
  imports: [HelpersModule],
  controllers: [BanksController],
  providers: [BanksService],
})
export class BanksModule {}
