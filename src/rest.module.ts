import { Module } from '@nestjs/common';
import { BanksModule } from './bin/banks/banks.module';
import { UsersModule } from './bin/users/users.module';
import { RegistrationsModule } from './bin/registrations/registrations.module';

@Module({
  imports: [BanksModule, UsersModule, RegistrationsModule],
})
export class RestModule {}
