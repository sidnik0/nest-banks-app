import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelperModule } from '../common/helper/helper.module';
import { IAccountRepository } from './interface/account.repository';
import { IBankRepository } from './interface/bank.repository';
import { ITransactionRepository } from './interface/transaction.repository';
import { IUserRepository } from './interface/user.repository';
import { DbAccountRepository } from './db-account.repository';
import { DbBankRepository } from './db-bank.repository';
import { DbTransactionRepository } from './db-transaction.repository';
import { DbUserRepository } from './db-user.repository';
import { FsAccountRepository } from './fs-account.repository';
import { FsBankRepository } from './fs-bank.repository';
import { FsTransactionRepository } from './fs-transaction.repository';
import { FsUserRepository } from './fs-user.repository';
import { AccountEntity } from '../model/account.entity';
import { BankEntity } from '../model/bank.entity';
import { TransactionEntity } from '../model/transaction.entity';
import { UserEntity } from '../model/user.entity';
@Module({
  imports: [HelperModule, TypeOrmModule.forFeature([AccountEntity, BankEntity, TransactionEntity, UserEntity])],
  providers: [
    {
      provide: IAccountRepository,
      useClass: DbAccountRepository,
    },
    {
      provide: IBankRepository,
      useClass: DbBankRepository,
    },
    {
      provide: ITransactionRepository,
      useClass: DbTransactionRepository,
    },
    {
      provide: IUserRepository,
      useClass: DbUserRepository,
    },
  ],
  exports: [IAccountRepository, IBankRepository, ITransactionRepository, IUserRepository],
})
export class RepositoryModule {}
