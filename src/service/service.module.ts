import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { IAccountService } from './interface/account.service';
import { IBankService } from './interface/bank.service';
import { ITransactionService } from './interface/transaction.service';
import { IUserService } from './interface/user.service';
import { AccountService } from './account.service';
import { BankService } from './bank.service';
import { TransactionService } from './transaction.service';
import { UserService } from './user.service';

@Module({
  imports: [RepositoryModule.init()],
  providers: [
    {
      provide: IAccountService,
      useClass: AccountService,
    },
    {
      provide: IBankService,
      useClass: BankService,
    },
    {
      provide: ITransactionService,
      useClass: TransactionService,
    },
    {
      provide: IUserService,
      useClass: UserService,
    },
  ],
  exports: [IAccountService, IBankService, ITransactionService, IUserService],
})
export class ServiceModule {}
