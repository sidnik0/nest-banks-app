import { Module } from '@nestjs/common';
import { HelpersModule } from '../../common/helpers/helpers.module';
import { AccountsRepository } from './accounts.repository';
import { AccountsRepositoryFs } from './accounts.repository.fs';

@Module({
  imports: [HelpersModule],
  providers: [
    {
      provide: AccountsRepository,
      useClass: AccountsRepositoryFs,
    },
  ],
  exports: [AccountsRepository],
})
export class AccountsRepositoryModule {}
