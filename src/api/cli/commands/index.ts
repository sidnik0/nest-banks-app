import { CreateAccountCommand } from './create-account-command';
import { CreateBankCommand } from './create-bank-command';
import { CreateTransactionCommand } from './create-transaction-command';
import { CreateUserCommand } from './create-user-command';
import { DeleteAccountCommand } from './delete-account-command';
import { DeleteBankCommand } from './delete-bank-command';
import { DeleteUserCommand } from './delete-user-command';
import { GetAccountCommand } from './get-account-command';
import { GetAccountsCommand } from './get-accounts-command';
import { GetAllAccountsByBankCommand } from './get-all-accounts-by-bank-command';
import { GetAllAccountsByUserAndBankCommand } from './get-all-accounts-by-user-and-bank-command';
import { GetAllAccountsByUserCommand } from './get-all-accounts-by-user-command';
import { GetAllTransactionsByAccountCommand } from './get-all-transactions-by-account-command';
import { GetBankCommand } from './get-bank-command';
import { GetBanksCommand } from './get-banks-command';
import { GetTransactionCommand } from './get-transaction-command';
import { GetTransactionsCommand } from './get-transactions-command';
import { GetUserCommand } from './get-user-command';
import { GetUsersCommand } from './get-users-command';
import { UpdateAccountCommand } from './update-account-command';
import { UpdateBankCommand } from './update-bank-command';
import { UpdateUserCommand } from './update-user-command';
import { ExitCommand } from './exit-command';
import { HelpCommand } from './help-command';

export const commands = [
  CreateAccountCommand,
  CreateBankCommand,
  CreateTransactionCommand,
  CreateUserCommand,
  DeleteAccountCommand,
  DeleteBankCommand,
  DeleteUserCommand,
  GetAccountCommand,
  GetAccountsCommand,
  GetAllAccountsByBankCommand,
  GetAllAccountsByUserAndBankCommand,
  GetAllAccountsByUserCommand,
  GetAllTransactionsByAccountCommand,
  GetBankCommand,
  GetBanksCommand,
  GetTransactionCommand,
  GetTransactionsCommand,
  GetUserCommand,
  GetUsersCommand,
  UpdateAccountCommand,
  UpdateBankCommand,
  UpdateUserCommand,
  ExitCommand,
  HelpCommand,
];
