import { Module } from '@nestjs/common';
import { HelpersModule } from '../../common/helpers/helpers.module';
import { TransactionsRepository } from './transactions.repository';
import { TransactionsRepositoryFs } from './transactions.repository.fs';

@Module({
  imports: [HelpersModule],
  providers: [
    {
      provide: TransactionsRepository,
      useClass: TransactionsRepositoryFs,
    },
  ],
  exports: [TransactionsRepository],
})
export class AccountRepositoryModule {}
