import { AccountCreateCommand } from './account-create.command';
import { AccountGetCommand } from './account-get.command';
import { AccountGetAllCommand } from './account-get-all.command';
import { AccountGetAllByBankCommand } from './account-get-all-by-bank.command';
import { AccountGetAllByUserAndBankCommand } from './account-get-all-by-user-and-bank.command';
import { AccountGetAllByUserCommand } from './account-get-all-by-user.command';
import { AccountUpdateCommand } from './account-update.command';
import { AccountDeleteCommand } from './account-delete.command';

import { BankCreateCommand } from './bank-create.command';
import { BankGetCommand } from './bank-get.command';
import { BankGetAllCommand } from './bank-get-all.command';
import { BankGetAllUsersCommand } from './bank-get-all-users.command';
import { BankUpdateCommand } from './bank-update.command';
import { BankDeleteCommand } from './bank-delete.command';

import { RateGetCommand } from './rate-get.command';
import { RateGetAllCommand } from './rate-get-all.command';
import { RateUpdateCommand } from './rate-update.command';

import { TransactionCreateCommand } from './transaction-create.command';
import { TransactionGetCommand } from './transaction-get.command';
import { TransactionGetAllCommand } from './transaction-get-all.command';
import { TransactionGetAllByAccountCommand } from './transaction-get-all-by-account.command';

import { UserCreateCommand } from './user-create.command';
import { UserGetCommand } from './user-get.command';
import { UserGetAllCommand } from './user-get-all.command';
import { UserGetAllBanksCommand } from './user-get-all-banks.command';
import { UserUpdateCommand } from './user-update.command';
import { UserDeleteCommand } from './user-delete.command';

import { ExitCommand } from './exit.command';
import { HelpCommand } from './help.command';

export const commands = [
  AccountCreateCommand,
  AccountGetCommand,
  AccountGetAllCommand,
  AccountGetAllByBankCommand,
  AccountGetAllByUserAndBankCommand,
  AccountGetAllByUserCommand,
  AccountUpdateCommand,
  AccountDeleteCommand,
  BankCreateCommand,
  BankGetCommand,
  BankGetAllCommand,
  BankGetAllUsersCommand,
  BankUpdateCommand,
  BankDeleteCommand,
  RateGetCommand,
  RateGetAllCommand,
  RateUpdateCommand,
  TransactionCreateCommand,
  TransactionGetCommand,
  TransactionGetAllCommand,
  TransactionGetAllByAccountCommand,
  UserCreateCommand,
  UserGetCommand,
  UserGetAllCommand,
  UserGetAllBanksCommand,
  UserUpdateCommand,
  UserDeleteCommand,
  ExitCommand,
  HelpCommand,
];
