import { Module } from '@nestjs/common';
import { CommandModule } from '../command/command.module';
import { AccountController } from './account.controller';
import { BankController } from './bank.controller';
import { TransactionController } from './transaction.controller';
import { UserController } from './user.controller';

@Module({
  imports: [CommandModule],
  controllers: [AccountController, BankController, TransactionController, UserController],
})
export class RestModule {}
