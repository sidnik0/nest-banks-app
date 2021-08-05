import { Module } from '@nestjs/common';
import { BanksModule } from './banks/banks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [BanksModule, UsersModule],
})
export class AppModule {}
