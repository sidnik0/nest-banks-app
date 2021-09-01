import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelperModule } from '../common/helper/helper.module';
import { AccountRepository } from './interface/account.repository';
import { FsAccountRepository } from './fs-account.repository';
import { BankRepository } from './interface/bank.repository';
import { FsBankRepository } from './fs-bank.repository';
import { TransactionRepository } from './interface/transaction.repository';
import { FsTransactionRepository } from './fs-transaction.repository';
import { UserRepository } from './interface/user.repository';
import { FsUserRepository } from './fs-user.repository';

@Module({
  imports: [HelperModule, TypeOrmModule.forFeature([])],
  providers: [
    {
      provide: AccountRepository,
      useClass: FsAccountRepository,
    },
    {
      provide: BankRepository,
      useClass: FsBankRepository,
    },
    {
      provide: TransactionRepository,
      useClass: FsTransactionRepository,
    },
    {
      provide: UserRepository,
      useClass: FsUserRepository,
    },
  ],
  exports: [
    AccountRepository,
    BankRepository,
    TransactionRepository,
    UserRepository,
  ],
})
export class RepositoryModule {}