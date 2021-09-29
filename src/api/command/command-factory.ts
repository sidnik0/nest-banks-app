import { Injectable, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { ICommand } from '../command/commands/command.interface';
import { BaseCommandDescriptor } from './values-object/base-command-descriptor';
import { CommandName } from '../../types/command-name.type';

import { AccountCreateCommand } from './commands/account-create.command';
import { BankCreateCommand } from './commands/bank-create.command';
import { TransactionCreateCommand } from './commands/transaction-create.command';
import { UserCreateWithAccountCommand } from './commands/user-create-with-account.command';
import { UserCreateCommand } from './commands/user-create.command';
import { AccountDeleteCommand } from './commands/account-delete.command';
import { BankDeleteCommand } from './commands/bank-delete.command';
import { UserDeleteCommand } from './commands/user-delete.command';
import { AccountGetCommand } from './commands/account-get.command';
import { AccountGetAllCommand } from './commands/account-get-all.command';
import { AccountGetAllByBankCommand } from './commands/account-get-all-by-bank.command';
import { AccountGetAllByUserAndBankCommand } from './commands/account-get-all-by-user-and-bank.command';
import { AccountGetAllByUserCommand } from './commands/account-get-all-by-user.command';
import { BankGetAllUsersCommand } from './commands/bank-get-all-users.command';
import { TransactionGetAllByAccountCommand } from './commands/transaction-get-all-by-account.command';
import { UserGetAllBanksCommand } from './commands/user-get-all-banks.command';
import { BankGetCommand } from './commands/bank-get.command';
import { BankGetAllCommand } from './commands/bank-get-all.command';
import { RateGetCommand } from './commands/rate-get.command';
import { RateGetAllCommand } from './commands/rate-get-all.command';
import { TransactionGetCommand } from './commands/transaction-get.command';
import { TransactionGetAllCommand } from './commands/transaction-get-all.command';
import { UserGetCommand } from './commands/user-get.command';
import { UserGetAllCommand } from './commands/user-get-all.command';
import { AccountUpdateCommand } from './commands/account-update.command';
import { BankUpdateCommand } from './commands/bank-update.command';
import { RateUpdateCommand } from './commands/rate-update.command';
import { UserUpdateCommand } from './commands/user-update.command';
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
      [CommandName.ACCOUNT_CREATE, AccountCreateCommand],
      [CommandName.BANK_CREATE, BankCreateCommand],
      [CommandName.TRANSACTION_CREATE, TransactionCreateCommand],
      [CommandName.USER_CREATE_WITH_ACCOUNT, UserCreateWithAccountCommand],
      [CommandName.USER_CREATE, UserCreateCommand],
      [CommandName.ACCOUNT_DELETE, AccountDeleteCommand],
      [CommandName.BANK_DELETE, BankDeleteCommand],
      [CommandName.USER_DELETE, UserDeleteCommand],
      [CommandName.ACCOUNT_GET, AccountGetCommand],
      [CommandName.ACCOUNT_GET_ALL, AccountGetAllCommand],
      [CommandName.ACCOUNT_GET_ALL_BY_BANK, AccountGetAllByBankCommand],
      [CommandName.ACCOUNT_GET_ALL_BY_USER_AND_BANK, AccountGetAllByUserAndBankCommand],
      [CommandName.ACCOUNT_GET_ALL_BY_USER, AccountGetAllByUserCommand],
      [CommandName.BANK_GET_ALL_USERS, BankGetAllUsersCommand],
      [CommandName.TRANSACTION_GET_ALL_BY_ACCOUNT, TransactionGetAllByAccountCommand],
      [CommandName.USER_GET_ALL_BANKS, UserGetAllBanksCommand],
      [CommandName.BANK_GET, BankGetCommand],
      [CommandName.BANK_GET_ALL, BankGetAllCommand],
      [CommandName.RATE_GET, RateGetCommand],
      [CommandName.RATE_GET_ALL, RateGetAllCommand],
      [CommandName.TRANSACTION_GET, TransactionGetCommand],
      [CommandName.TRANSACTION_GET_ALL, TransactionGetAllCommand],
      [CommandName.USER_GET, UserGetCommand],
      [CommandName.USER_GET_ALL, UserGetAllCommand],
      [CommandName.ACCOUNT_UPDATE, AccountUpdateCommand],
      [CommandName.BANK_UPDATE, BankUpdateCommand],
      [CommandName.RATE_UPDATE, RateUpdateCommand],
      [CommandName.UPDATE_USER, UserUpdateCommand],
      [CommandName.EXIT, ExitCommand],
      [CommandName.HELP, HelpCommand],
    ]);
  }
}
