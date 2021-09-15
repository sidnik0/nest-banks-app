import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandModule } from '../command/command.module';
import { AccountController } from './account.controller';
import { BankController } from './bank.controller';
import { TransactionController } from './transaction.controller';
import { UserController } from './user.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://user:password@localhost:5432/db',
      autoLoadEntities: true,
      synchronize: true,
      retryAttempts: 2,
    }),
    CommandModule,
  ],
  controllers: [AccountController, BankController, TransactionController, UserController],
})
export class RestModule {}
