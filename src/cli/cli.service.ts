import { Injectable } from '@nestjs/common';

import { CreateAccountCommand } from './accountsCommands/create-account.command';
import { GetAccountCommand } from './accountsCommands/get-account.command';
import { GetAllAccountsUserCommand } from './accountsCommands/get-all-accounts-user.command';

import { DeleteBankCommand } from './banksCommands/delete-bank.command';
import { GetBankCommand } from './banksCommands/get-bank.command';
import { GetBanksCommand } from './banksCommands/get-banks.command';
import { UpdateBankCommand } from './banksCommands/update-bank.command';

import { BankRegistrationCommand } from './bankUsersCommands/bank-registration.command';
import { GetAllBanksUserCommand } from './bankUsersCommands/get-all-banks-user.command';
import { GetAllUsersBankCommand } from './bankUsersCommands/get-all-users-bank.command';

import { RegistrationUserCommand } from './registrationsCommands/registration-user.command';
import { RegistrationBankCommand } from './registrationsCommands/registration-bank.command';

import { GetTransactionCommand } from './transactionsCommands/get-transaction.command';
import { CreateTransactionCommand } from './transactionsCommands/create-transaction.command';
import { GetAllTransactionsAccountCommand } from './transactionsCommands/get-all-transactions-account.command';

import { UpdateUserCommand } from './usersCommands/update-user.command';
import { DeleteUserCommand } from './usersCommands/delete-user.command';
import { GetUserCommand } from './usersCommands/get-user.command';
import { GetUsersCommand } from './usersCommands/get-users.command';

import { commands } from './commands';
import { help } from './helps';

@Injectable()
export class CliService {
  constructor(
    private readonly createAccountCommand: CreateAccountCommand,
    private readonly getAccountCommand: GetAccountCommand,
    private readonly getAllAccountsUserCommand: GetAllAccountsUserCommand,
    private readonly deleteBankCommand: DeleteBankCommand,
    private readonly getBankCommand: GetBankCommand,
    private readonly getBanksCommand: GetBanksCommand,
    private readonly updateBankCommand: UpdateBankCommand,
    private readonly bankRegistrationCommand: BankRegistrationCommand,
    private readonly getAllBanksUserCommand: GetAllBanksUserCommand,
    private readonly getAllUsersBankCommand: GetAllUsersBankCommand,
    private readonly registrationUserCommand: RegistrationUserCommand,
    private readonly registrationBankCommand: RegistrationBankCommand,
    private readonly getTransactionCommand: GetTransactionCommand,
    private readonly createTransactionCommand: CreateTransactionCommand,
    private readonly getAllTransactionsAccountCommand: GetAllTransactionsAccountCommand,
    private readonly updateUserCommand: UpdateUserCommand,
    private readonly deleteUserCommand: DeleteUserCommand,
    private readonly getUserCommand: GetUserCommand,
    private readonly getUsersCommand: GetUsersCommand,
  ) {}

  async run(args: string[]): Promise<void> {
    const [, , firstArg, ...options] = args;

    if (firstArg === commands.help || !firstArg) {
      console.log(help);
      process.exit(0);
    } else {
      switch (firstArg) {
        case commands.createUser:
          await this.registrationUserCommand.run(options);
          break;
        case commands.getUsers:
          await this.getUsersCommand.run(options);
          break;
        case commands.getUser:
          await this.getUserCommand.run(options);
          break;
        case commands.updateUser:
          await this.updateUserCommand.run(options);
          break;
        case commands.deleteUser:
          await this.deleteUserCommand.run(options);
          break;
        case commands.createBank:
          await this.registrationBankCommand.run(options);
          break;
        case commands.getBanks:
          await this.getBanksCommand.run(options);
          break;
        case commands.getBank:
          await this.getBankCommand.run(options);
          break;
        case commands.updateBank:
          await this.updateBankCommand.run(options);
          break;
        case commands.deleteBank:
          await this.deleteBankCommand.run(options);
          break;
        case commands.bankRegistrationWithAccount:
          await this.bankRegistrationCommand.run(options);
          break;
        case commands.createAccount:
          await this.createAccountCommand.run(options);
          break;
        case commands.getAccount:
          await this.getAccountCommand.run(options);
          break;
        case commands.getAllAccountsUser:
          await this.getAllAccountsUserCommand.run(options);
          break;
        case commands.getAllUserBanks:
          await this.getAllUsersBankCommand.run(options);
          break;
        case commands.getAllBankUsers:
          await this.getAllBanksUserCommand.run(options);
          break;
        case commands.createTransaction:
          await this.createTransactionCommand.run(options);
          break;
        case commands.getAllTransactionsAccount:
          await this.getAllTransactionsAccountCommand.run(options);
          break;
        default:
          console.log('Error: unknown command ' + firstArg);
          break;
      }
      process.exit(0);
    }
  }
}
