import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelperModule } from '../common/helper/helper.module';
import { IAccountRepository } from './interface/account.repository';
import { FsAccountRepository } from './fs-account.repository';
import { IBankRepository } from './interface/bank.repository';
import { FsBankRepository } from './fs-bank.repository';
import { ITransactionRepository } from './interface/transaction.repository';
import { FsTransactionRepository } from './fs-transaction.repository';
import { IUserRepository } from './interface/user.repository';
import { FsUserRepository } from './fs-user.repository';

@Module({
  imports: [HelperModule, TypeOrmModule.forFeature([])],
  providers: [
    {
      provide: IAccountRepository,
      useClass: FsAccountRepository,
    },
    {
      provide: IBankRepository,
      useClass: FsBankRepository,
    },
    {
      provide: ITransactionRepository,
      useClass: FsTransactionRepository,
    },
    {
      provide: IUserRepository,
      useClass: FsUserRepository,
    },
  ],
  exports: [
    IAccountRepository,
    IBankRepository,
    ITransactionRepository,
    IUserRepository,
  ],
})
export class RepositoryModule {}
