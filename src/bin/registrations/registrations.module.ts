import { Module } from '@nestjs/common';
import { RegistrationsController } from './registrations.controller';
import { RegistrationsService } from './registrations.service';

import { BanksModule } from '../banks/banks.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [BanksModule, UsersModule],
  controllers: [RegistrationsController],
  providers: [RegistrationsService],
  exports: [RegistrationsService],
})
export class RegistrationsModule {}
