import { Module } from '@nestjs/common';
import { BanksModule } from './banks/banks.module';
import { UsersModule } from './users/users.module';
import { RegistrationsModule } from './registrations/registrations.module';

@Module({
  imports: [BanksModule, UsersModule, RegistrationsModule],
})
export class RestModule {}
