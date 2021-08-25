import { CreatorCommand } from './interface/creator-command';
import { CommandType } from '../../types/command.type';
import { CreateAccountCreator } from './command/create-account-creator';
import { CreateBankCreator } from './command/create-bank-creator';
import { CreateTransactionCreator } from './command/create-transaction-creator';
import { CreateUserCreator } from './command/create-user-creator';
import { DeleteAccountCreator } from './command/delete-account-creator';
import { DeleteBankCreator } from './command/delete-bank-creator';
import { DeleteUserCreator } from './command/delete-user-creator';
import { GetAccountCreator } from './command/get-account-creator';
import { GetAccountsCreator } from './command/get-accounts-creator';
import { GetAllAccountsByBankCreator } from './command/get-all-accounts-by-bank-creator';
import { GetAllAccountsByUserAndBankCreator } from './command/get-all-accounts-by-user-and-bank-creator';
import { GetAllAccountsByUserCreator } from './command/get-all-accounts-by-user-creator';
import { GetAllTransactionsByAccountCreator } from './command/get-all-transactions-by-account-creator';
import { GetBankCreator } from './command/get-bank-creator';
import { GetBanksCreator } from './command/get-banks-creator';
import { GetTransactionCreator } from './command/get-transaction-creator';
import { GetTransactionsCreator } from './command/get-transactions-creator';
import { GetUserCreator } from './command/get-user-creator';
import { GetUsersCreator } from './command/get-users-creator';
import { UpdateAccountCreator } from './command/update-account-creator';
import { UpdateBankCreator } from './command/update-bank-creator';
import { UpdateUserCreator } from './command/update-user-creator';
import { HelpCreator } from './command/help-creator';
import { ExitCreator } from './command/exit-creator';

export class CommandDescriptor {
  getCommand(command: string): CreatorCommand {
    switch (command) {
      case CommandType.EXIT:
        return new ExitCreator();
      case CommandType.CREATE_USER:
        return new CreateUserCreator();
      case CommandType.GET_USERS:
        return new GetUsersCreator();
      case CommandType.GET_USER:
        return new GetUserCreator();
      case CommandType.UPDATE_USER:
        return new UpdateUserCreator();
      case CommandType.DELETE_USER:
        return new DeleteUserCreator();
      case CommandType.CREATE_BANK:
        return new CreateBankCreator();
      case CommandType.GET_BANKS:
        return new GetBanksCreator();
      case CommandType.GET_BANK:
        return new GetBankCreator();
      case CommandType.UPDATE_BANK:
        return new UpdateBankCreator();
      case CommandType.DELETE_BANK:
        return new DeleteBankCreator();
      case CommandType.CREATE_ACCOUNT:
        return new CreateAccountCreator();
      case CommandType.GET_ACCOUNTS:
        return new GetAccountsCreator();
      case CommandType.GET_ACCOUNT:
        return new GetAccountCreator();
      case CommandType.GET_ALL_ACCOUNTS_BY_USER:
        return new GetAllAccountsByUserCreator();
      case CommandType.GET_ALL_ACCOUNTS_BY_BANK:
        return new GetAllAccountsByBankCreator();
      case CommandType.GET_ALL_ACCOUNTS_BY_USER_AND_BANK:
        return new GetAllAccountsByUserAndBankCreator();
      case CommandType.UPDATE_ACCOUNT:
        return new UpdateAccountCreator();
      case CommandType.DELETE_ACCOUNT:
        return new DeleteAccountCreator();
      case CommandType.CREATE_TRANSACTION:
        return new CreateTransactionCreator();
      case CommandType.GET_TRANSACTIONS:
        return new GetTransactionsCreator();
      case CommandType.GET_TRANSACTION:
        return new GetTransactionCreator();
      case CommandType.GET_ALL_TRANSACTIONS_BY_ACCOUNT:
        return new GetAllTransactionsByAccountCreator();
      case CommandType.HELP:
        return new HelpCreator();
      default:
        return new HelpCreator();
    }
  }
}
