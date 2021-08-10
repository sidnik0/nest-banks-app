import { Module } from '@nestjs/common';
import { BankRegistrationCommand } from './bank-registration.command';
import { CreateAccountCommand } from './create-account.command';
import { CreateTransactionCommand } from './create-transaction.command';
import { DeleteUserCommand } from './delete-user.command';
import { GetAccountCommand } from './get-account.command';
import { GetAllAccountsUserCommand } from './get-all-accounts-user.command';
import { GetAllBanksUsersCommand } from './get-all-banks-users.command';
import { GetAllTransactionsAccountCommand } from './get-all-transactions-account.command';
import { GetTransactionCommand } from './get-transaction.command';
import { GetUserCommand } from './get-user.command';
import { GetUsersCommand } from './get-users.command';
import { UpdateUserCommand } from './update-user.command';

import { HelpersModule } from '../../common/helpers/helpers.module';
import { UsersModule } from '../../users/users.module';

@Module({
  imports: [HelpersModule, UsersModule],
  providers: [
    BankRegistrationCommand,
    GetUserCommand,
    GetUsersCommand,
    UpdateUserCommand,
    DeleteUserCommand,
    GetAllBanksUsersCommand,
    CreateAccountCommand,
    GetAccountCommand,
    GetAllAccountsUserCommand,
    CreateTransactionCommand,
    GetTransactionCommand,
    GetAllTransactionsAccountCommand,
  ],
})
export class UsersCommandsModule {}
