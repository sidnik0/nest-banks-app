import { Module } from '@nestjs/common';
import { CliService } from './cli.service';
import { RegistrationsCommandsModule } from './registrationsCommands/registrations-commands.module';
import { UsersCommandsModule } from './usersCommands/users-commands.module';
import { BanksCommandsModule } from './banksCommands/banks-commands.module';
import { AccountsCommandsModule } from './accountsCommands/accounts-commands.module';
import { BankUsersCommandsModule } from './bankUsersCommands/bank-users-commands.module';
import { TransactionsCommandsModule } from './transactionsCommands/transactions-commands.module';

@Module({
  imports: [
    RegistrationsCommandsModule,
    UsersCommandsModule,
    BanksCommandsModule,
    AccountsCommandsModule,
    BankUsersCommandsModule,
    TransactionsCommandsModule,
  ],
  providers: [CliService],
})
export class CliModule {}
