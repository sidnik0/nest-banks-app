import { Module } from '@nestjs/common';
import { HelpersModule } from '../../common/helpers/helpers.module';
import { BankUsersRepository } from './bank-users.repository';
import { BankUsersRepositoryFs } from './bank-users.repository.fs';

@Module({
  imports: [HelpersModule],
  providers: [
    {
      provide: BankUsersRepository,
      useClass: BankUsersRepositoryFs,
    },
  ],
  exports: [BankUsersRepository],
})
export class BankUsersRepositoryModule {}
