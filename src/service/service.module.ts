import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { AccountService } from './account.service';
import { BankService } from './bank.service';
import { TransactionService } from './transaction.service';
import { UserService } from './user.service';

@Module({
  imports: [RepositoryModule],
  providers: [AccountService, BankService, TransactionService, UserService],
  exports: [AccountService, BankService, TransactionService, UserService],
})
export class ServiceModule {}
