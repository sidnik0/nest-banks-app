import { Injectable, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { Command } from './commands/command';
import { CommandDescriptor } from './interface/command-descriptor';
import { CommandType } from '../../types/command.type';

import { CreateAccountCommand } from './commands/create-account-command';
import { CreateBankCommand } from './commands/create-bank-command';
import { CreateTransactionCommand } from './commands/create-transaction-command';
import { CreateUserCommand } from './commands/create-user-command';
import { DeleteAccountCommand } from './commands/delete-account-command';
import { DeleteBankCommand } from './commands/delete-bank-command';
import { DeleteUserCommand } from './commands/delete-user-command';
import { GetAccountCommand } from './commands/get-account-command';
import { GetAccountsCommand } from './commands/get-accounts-command';
import { GetAllAccountsByBankCommand } from './commands/get-all-accounts-by-bank-command';
import { GetAllAccountsByUserAndBankCommand } from './commands/get-all-accounts-by-user-and-bank-command';
import { GetAllAccountsByUserCommand } from './commands/get-all-accounts-by-user-command';
import { GetAllTransactionsByAccountCommand } from './commands/get-all-transactions-by-account-command';
import { GetBankCommand } from './commands/get-bank-command';
import { GetBanksCommand } from './commands/get-banks-command';
import { GetTransactionCommand } from './commands/get-transaction-command';
import { GetTransactionsCommand } from './commands/get-transactions-command';
import { GetUserCommand } from './commands/get-user-command';
import { GetUsersCommand } from './commands/get-users-command';
import { UpdateAccountCommand } from './commands/update-account-command';
import { UpdateBankCommand } from './commands/update-bank-command';
import { UpdateUserCommand } from './commands/update-user-command';
import { ExitCommand } from './commands/exit-command';
import { HelpCommand } from './commands/help-command';
import { CommandFactoryException } from '../../common/exseption/command-factory-exception';

@Injectable()
export class CommandFactory {
  private static commandsLib: Map<string, Type<Command>>;

  constructor(private readonly moduleRef: ModuleRef) {
    CommandFactory.commandsLib = this.getCommandLib();
  }

  getCommand({ name }: CommandDescriptor): Command {
    if (!CommandFactory.commandsLib.has(name)) {
      throw new CommandFactoryException(`unknown command: ${name}`);
    }

    const commandClass = CommandFactory.commandsLib.get(name);

    return this.moduleRef.get(commandClass);
  }

  private getCommandLib(): Map<string, Type<Command>> {
    return new Map<string, Type<Command>>([
      [CommandType.CREATE_ACCOUNT, CreateAccountCommand],
      [CommandType.CREATE_BANK, CreateBankCommand],
      [CommandType.CREATE_TRANSACTION, CreateTransactionCommand],
      [CommandType.CREATE_USER, CreateUserCommand],
      [CommandType.DELETE_ACCOUNT, DeleteAccountCommand],
      [CommandType.DELETE_BANK, DeleteBankCommand],
      [CommandType.DELETE_USER, DeleteUserCommand],
      [CommandType.GET_ACCOUNT, GetAccountCommand],
      [CommandType.GET_ACCOUNTS, GetAccountsCommand],
      [CommandType.GET_ALL_ACCOUNTS_BY_BANK, GetAllAccountsByBankCommand],
      [
        CommandType.GET_ALL_ACCOUNTS_BY_USER_AND_BANK,
        GetAllAccountsByUserAndBankCommand,
      ],
      [CommandType.GET_ALL_ACCOUNTS_BY_USER, GetAllAccountsByUserCommand],
      [
        CommandType.GET_ALL_TRANSACTIONS_BY_ACCOUNT,
        GetAllTransactionsByAccountCommand,
      ],
      [CommandType.GET_BANK, GetBankCommand],
      [CommandType.GET_BANKS, GetBanksCommand],
      [CommandType.GET_TRANSACTION, GetTransactionCommand],
      [CommandType.GET_TRANSACTIONS, GetTransactionsCommand],
      [CommandType.GET_USER, GetUserCommand],
      [CommandType.GET_USERS, GetUsersCommand],
      [CommandType.UPDATE_ACCOUNT, UpdateAccountCommand],
      [CommandType.UPDATE_BANK, UpdateBankCommand],
      [CommandType.UPDATE_USER, UpdateUserCommand],
      [CommandType.EXIT, ExitCommand],
      [CommandType.HELP, HelpCommand],
    ]);
  }
}
