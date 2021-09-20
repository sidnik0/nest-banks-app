import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelperModule } from '../common/helper/helper.module';
import { IAccountRepository } from './interface/account.repository';
import { IBankRepository } from './interface/bank.repository';
import { IRateRepository } from './interface/rate.repository';
import { ITransactionRepository } from './interface/transaction.repository';
import { IUserRepository } from './interface/user.repository';
import { DbAccountRepository } from './db-account.repository';
import { DbBankRepository } from './db-bank.repository';
import { DbRateRepository } from './db-rate.repository';
import { DbTransactionRepository } from './db-transaction.repository';
import { DbUserRepository } from './db-user.repository';
import { FsAccountRepository } from './fs-account.repository';
import { FsBankRepository } from './fs-bank.repository';
import { FsRateRepository } from './fs-rate.repository';
import { FsTransactionRepository } from './fs-transaction.repository';
import { FsUserRepository } from './fs-user.repository';
import { AccountEntity } from '../model/account.entity';
import { BankEntity } from '../model/bank.entity';
import { TransactionEntity } from '../model/transaction.entity';
import { UserEntity } from '../model/user.entity';

@Module({})
export class RepositoryModule {
  static init(): DynamicModule {
    const user = process.env.DATABASE_NAME;
    const password = process.env.DATABASE_PASSWORD;
    const port = process.env.DATABASE_PORT;

    return {
      module: RepositoryModule,
      imports:
        process.env.DB === 'sql'
          ? [
              TypeOrmModule.forRoot({
                type: 'postgres',
                url: `postgres://${user}:${password}@localhost:${port}/banks_app`,
                autoLoadEntities: true,
                synchronize: true,
              }),
              TypeOrmModule.forFeature([AccountEntity, BankEntity, TransactionEntity, UserEntity]),
            ]
          : [HelperModule],
      providers:
        process.env.DB === 'sql'
          ? [
              { provide: IAccountRepository, useClass: DbAccountRepository },
              { provide: IBankRepository, useClass: DbBankRepository },
              { provide: IRateRepository, useClass: DbRateRepository },
              { provide: ITransactionRepository, useClass: DbTransactionRepository },
              { provide: IUserRepository, useClass: DbUserRepository },
            ]
          : [
              { provide: IAccountRepository, useClass: FsAccountRepository },
              { provide: IBankRepository, useClass: FsBankRepository },
              { provide: IRateRepository, useClass: FsRateRepository },
              { provide: ITransactionRepository, useClass: FsTransactionRepository },
              { provide: IUserRepository, useClass: FsUserRepository },
            ],
      exports: [IAccountRepository, IBankRepository, IRateRepository, ITransactionRepository, IUserRepository],
    };
  }
}
