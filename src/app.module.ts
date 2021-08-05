import { Module } from '@nestjs/common';
import { BanksModule } from './banks/banks.module';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [BanksModule, UsersModule, AccountsModule],
})
export class AppModule {}
