import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { IAccountService } from './interface/account.service';
import { IBankService } from './interface/bank.service';
import { IRateService } from './interface/rate.service';
import { ITransactionService } from './interface/transaction.service';
import { IUserService } from './interface/user.service';
import { AccountService } from './account.service';
import { BankService } from './bank.service';
import { RateService } from './rate.service';
import { TransactionService } from './transaction.service';
import { UserService } from './user.service';
import { UtilHttpModule } from '../common/util/http/util-http.module';

@Module({
  imports: [RepositoryModule.forRoot(), UtilHttpModule],
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
      provide: IRateService,
      useClass: RateService,
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
  exports: [IAccountService, IBankService, IRateService, ITransactionService, IUserService],
})
export class ServiceModule {}
