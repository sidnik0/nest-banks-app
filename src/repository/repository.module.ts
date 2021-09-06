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
import { AccountEntity } from 'src/model/account.entity';
import { BankEntity } from 'src/model/bank.entity';
import { TransactionEntity } from 'src/model/transaction.entity';
import { UserEntity } from 'src/model/user.entity';
import { DbAccountRepository } from './db-account.repository';
import { DbBankRepository } from './db-bank.repository';
import { DbTransactionRepository } from './db-transaction.repository';
import { DbUserRepository } from './db-user.repository';

@Module({
  imports: [
    HelperModule, 
    TypeOrmModule.forFeature([
      AccountEntity, 
      BankEntity, 
      TransactionEntity, 
      UserEntity
    ])
  ],
  providers: [
    {
      provide: AccountRepository,
      useClass: DbAccountRepository,
    },
    {
      provide: BankRepository,
      useClass: DbBankRepository,
    },
    {
      provide: TransactionRepository,
      useClass: DbTransactionRepository,
    },
    {
      provide: UserRepository,
      useClass: DbUserRepository,
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
