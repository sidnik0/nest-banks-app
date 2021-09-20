import { Injectable, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { ICommand } from '../command/commands/command.interface';
import { BaseCommandDescriptor } from './values-object/base-command-descriptor';
import { CommandName } from '../../types/command-name.type';

import { CreateAccountCommand } from './commands/create-account.command';
import { CreateBankCommand } from './commands/create-bank.command';
import { CreateTransactionCommand } from './commands/create-transaction.command';
import { CreateUserCommand } from './commands/create-user.command';
import { DeleteAccountCommand } from './commands/delete-account.command';
import { DeleteBankCommand } from './commands/delete-bank.command';
import { DeleteUserCommand } from './commands/delete-user.command';
import { GetAccountCommand } from './commands/get-account.command';
import { GetAccountsCommand } from './commands/get-accounts.command';
import { GetAllAccountsByBankCommand } from './commands/get-all-accounts-by-bank.command';
import { GetAllAccountsByUserAndBankCommand } from './commands/get-all-accounts-by-user-and-bank.command';
import { GetAllAccountsByUserCommand } from './commands/get-all-accounts-by-user.command';
import { GetAllBankUsersCommand } from './commands/get-all-bank-users.command';
import { GetAllTransactionsByAccountCommand } from './commands/get-all-transactions-by-account.command';
import { GetAllUserBanksCommand } from './commands/get-all-user-banks.command';
import { GetBankCommand } from './commands/get-bank.command';
import { GetBanksCommand } from './commands/get-banks.command';
import { GetRateCommand } from './commands/get-rate.command';
import { GetRatesCommand } from './commands/get-rates.command';
import { GetTransactionCommand } from './commands/get-transaction.command';
import { GetTransactionsCommand } from './commands/get-transactions.command';
import { GetUserCommand } from './commands/get-user.command';
import { GetUsersCommand } from './commands/get-users.command';
import { UpdateAccountCommand } from './commands/update-account.command';
import { UpdateBankCommand } from './commands/update-bank.command';
import { UpdateRateCommand } from './commands/update-rate.command';
import { UpdateUserCommand } from './commands/update-user.command';
import { ExitCommand } from './commands/exit.command';
import { HelpCommand } from './commands/help.command';
import { CommandFactoryException } from '../../common/exception/command-factory.exception';

@Injectable()
export class CommandFactory {
  private static COMMAND_LIB: Map<string, Type<ICommand>> = CommandFactory.getCommandLib();

  constructor(private readonly moduleRef: ModuleRef) {}

  getCommand({ name }: BaseCommandDescriptor): ICommand {
    if (!CommandFactory.COMMAND_LIB.has(name)) {
      throw new CommandFactoryException(`Unknown command: ${name}`);
    }

    const commandClass = CommandFactory.COMMAND_LIB.get(name);

    return this.moduleRef.get(commandClass);
  }

  private static getCommandLib(): Map<string, Type<ICommand>> {
    return new Map<string, Type<ICommand>>([
      [CommandName.CREATE_ACCOUNT, CreateAccountCommand],
      [CommandName.CREATE_BANK, CreateBankCommand],
      [CommandName.CREATE_TRANSACTION, CreateTransactionCommand],
      [CommandName.CREATE_USER, CreateUserCommand],
      [CommandName.DELETE_ACCOUNT, DeleteAccountCommand],
      [CommandName.DELETE_BANK, DeleteBankCommand],
      [CommandName.DELETE_USER, DeleteUserCommand],
      [CommandName.GET_ACCOUNT, GetAccountCommand],
      [CommandName.GET_ACCOUNTS, GetAccountsCommand],
      [CommandName.GET_ALL_ACCOUNTS_BY_BANK, GetAllAccountsByBankCommand],
      [CommandName.GET_ALL_ACCOUNTS_BY_USER_AND_BANK, GetAllAccountsByUserAndBankCommand],
      [CommandName.GET_ALL_ACCOUNTS_BY_USER, GetAllAccountsByUserCommand],
      [CommandName.GET_ALL_BANK_USERS, GetAllBankUsersCommand],
      [CommandName.GET_ALL_TRANSACTIONS_BY_ACCOUNT, GetAllTransactionsByAccountCommand],
      [CommandName.GET_ALL_USER_BANKS, GetAllUserBanksCommand],
      [CommandName.GET_BANK, GetBankCommand],
      [CommandName.GET_BANKS, GetBanksCommand],
      [CommandName.GET_RATE, GetRateCommand],
      [CommandName.GET_RATES, GetRatesCommand],
      [CommandName.GET_TRANSACTION, GetTransactionCommand],
      [CommandName.GET_TRANSACTIONS, GetTransactionsCommand],
      [CommandName.GET_USER, GetUserCommand],
      [CommandName.GET_USERS, GetUsersCommand],
      [CommandName.UPDATE_ACCOUNT, UpdateAccountCommand],
      [CommandName.UPDATE_BANK, UpdateBankCommand],
      [CommandName.UPDATE_RATE, UpdateRateCommand],
      [CommandName.UPDATE_USER, UpdateUserCommand],
      [CommandName.EXIT, ExitCommand],
      [CommandName.HELP, HelpCommand],
    ]);
  }
}
