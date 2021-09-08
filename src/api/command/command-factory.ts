import { Injectable, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { ICommand } from '../command/commands/command.interface';
import { CommandDescriptor } from '../command/interface/command-descriptor';
import { CommandName } from '../../types/command-name.type';

import { CreateAccountCommand } from '../command/commands/create-account-command';
import { CreateBankCommand } from '../command/commands/create-bank-command';
import { CreateTransactionCommand } from '../command/commands/create-transaction-command';
import { CreateUserCommand } from '../command/commands/create-user-command';
import { DeleteAccountCommand } from '../command/commands/delete-account-command';
import { DeleteBankCommand } from '../command/commands/delete-bank-command';
import { DeleteUserCommand } from '../command/commands/delete-user-command';
import { GetAccountCommand } from '../command/commands/get-account-command';
import { GetAccountsCommand } from '../command/commands/get-accounts-command';
import { GetAllAccountsByBankCommand } from '../command/commands/get-all-accounts-by-bank-command';
import { GetAllAccountsByUserAndBankCommand } from '../command/commands/get-all-accounts-by-user-and-bank-command';
import { GetAllAccountsByUserCommand } from '../command/commands/get-all-accounts-by-user-command';
import { GetAllTransactionsByAccountCommand } from '../command/commands/get-all-transactions-by-account-command';
import { GetBankCommand } from '../command/commands/get-bank-command';
import { GetBanksCommand } from '../command/commands/get-banks-command';
import { GetTransactionCommand } from '../command/commands/get-transaction-command';
import { GetTransactionsCommand } from '../command/commands/get-transactions-command';
import { GetUserCommand } from '../command/commands/get-user-command';
import { GetUsersCommand } from '../command/commands/get-users-command';
import { UpdateAccountCommand } from '../command/commands/update-account-command';
import { UpdateBankCommand } from '../command/commands/update-bank-command';
import { UpdateUserCommand } from '../command/commands/update-user-command';
import { ExitCommand } from '../command/commands/exit-command';
import { HelpCommand } from '../command/commands/help-command';
import { CommandFactoryException } from '../../common/exseption/command-factory-exception';

@Injectable()
export class CommandFactory {
  private static COMMAND_LIB: Map<string, Type<ICommand>> = CommandFactory.getCommandLib();

  constructor(private readonly moduleRef: ModuleRef) {}

  getCommand({ name }: CommandDescriptor): ICommand {
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
      [
        CommandName.GET_ALL_ACCOUNTS_BY_USER_AND_BANK,
        GetAllAccountsByUserAndBankCommand,
      ],
      [CommandName.GET_ALL_ACCOUNTS_BY_USER, GetAllAccountsByUserCommand],
      [
        CommandName.GET_ALL_TRANSACTIONS_BY_ACCOUNT,
        GetAllTransactionsByAccountCommand,
      ],
      [CommandName.GET_BANK, GetBankCommand],
      [CommandName.GET_BANKS, GetBanksCommand],
      [CommandName.GET_TRANSACTION, GetTransactionCommand],
      [CommandName.GET_TRANSACTIONS, GetTransactionsCommand],
      [CommandName.GET_USER, GetUserCommand],
      [CommandName.GET_USERS, GetUsersCommand],
      [CommandName.UPDATE_ACCOUNT, UpdateAccountCommand],
      [CommandName.UPDATE_BANK, UpdateBankCommand],
      [CommandName.UPDATE_USER, UpdateUserCommand],
      [CommandName.EXIT, ExitCommand],
      [CommandName.HELP, HelpCommand],
    ]);
  }
}
