import { Module } from '@nestjs/common';
import { RegistrationsCommandsModule } from './cli/registrationsCommands/registrations-commands.module';
import { UsersCommandsModule } from './cli/usersCommands/users-commands.module';
import { BanksCommandsModule } from './cli/banksCommands/banks-commands.module';
import { AccountsCommandsModule } from './cli/accountsCommands/accounts-commands.module';
import { BankUsersCommandModule } from './cli/bankUsersCommands/bank-users-command.module';
import { TransactionsCommandsModule } from './cli/transactionsCommand/transactions-commands.module';

@Module({
  imports: [
    RegistrationsCommandsModule,
    UsersCommandsModule,
    BanksCommandsModule,
    AccountsCommandsModule,
    BankUsersCommandModule,
    TransactionsCommandsModule,
  ],
})
export class CliModule {}
