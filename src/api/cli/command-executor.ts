import { Injectable } from '@nestjs/common';
import { CommandDescriptor } from './interface/command-descriptor';
import { CommandType } from '../../types/command.type';
import { ExitCreator } from './commands/exit-creator';
import { CreateUserCreator } from './commands/create-user-creator';
import { GetUsersCreator } from './commands/get-users-creator';
import { GetUserCreator } from './commands/get-user-creator';
import { UpdateUserCreator } from './commands/update-user-creator';
import { DeleteUserCreator } from './commands/delete-user-creator';
import { CreateBankCreator } from './commands/create-bank-creator';
import { GetBanksCreator } from './commands/get-banks-creator';
import { GetBankCreator } from './commands/get-bank-creator';
import { UpdateBankCreator } from './commands/update-bank-creator';
import { DeleteBankCreator } from './commands/delete-bank-creator';
import { CreateAccountCreator } from './commands/create-account-creator';
import { GetAccountsCreator } from './commands/get-accounts-creator';
import { GetAccountCreator } from './commands/get-account-creator';
import { GetAllAccountsByUserCreator } from './commands/get-all-accounts-by-user-creator';
import { GetAllAccountsByBankCreator } from './commands/get-all-accounts-by-bank-creator';
import { GetAllAccountsByUserAndBankCreator } from './commands/get-all-accounts-by-user-and-bank-creator';
import { UpdateAccountCreator } from './commands/update-account-creator';
import { DeleteAccountCreator } from './commands/delete-account-creator';
import { CreateTransactionCreator } from './commands/create-transaction-creator';
import { GetTransactionsCreator } from './commands/get-transactions-creator';
import { GetTransactionCreator } from './commands/get-transaction-creator';
import { GetAllTransactionsByAccountCreator } from './commands/get-all-transactions-by-account-creator';
import { HelpCreator } from './commands/help-creator';
import { CreatorCommand } from './interface/creator-command';
import { CommandLineParserException } from '../../common/exseption/command-line-parser-exception';

@Injectable()
export class CommandExecutor {
  private params: string[];

  async executeCommand(commandDescriptor: CommandDescriptor): Promise<string> {
    this.params = commandDescriptor.params;

    switch (commandDescriptor.name) {
      case CommandType.EXIT:
        return await this.runCommand(new ExitCreator());
      case CommandType.CREATE_USER:
        return await this.runCommand(new CreateUserCreator());
      case CommandType.GET_USERS:
        return await this.runCommand(new GetUsersCreator());
      case CommandType.GET_USER:
        return await this.runCommand(new GetUserCreator());
      case CommandType.UPDATE_USER:
        return await this.runCommand(new UpdateUserCreator());
      case CommandType.DELETE_USER:
        return await this.runCommand(new DeleteUserCreator());
      case CommandType.CREATE_BANK:
        return await this.runCommand(new CreateBankCreator());
      case CommandType.GET_BANKS:
        return await this.runCommand(new GetBanksCreator());
      case CommandType.GET_BANK:
        return await this.runCommand(new GetBankCreator());
      case CommandType.UPDATE_BANK:
        return await this.runCommand(new UpdateBankCreator());
      case CommandType.DELETE_BANK:
        return await this.runCommand(new DeleteBankCreator());
      case CommandType.CREATE_ACCOUNT:
        return await this.runCommand(new CreateAccountCreator());
      case CommandType.GET_ACCOUNTS:
        return await this.runCommand(new GetAccountsCreator());
      case CommandType.GET_ACCOUNT:
        return await this.runCommand(new GetAccountCreator());
      case CommandType.GET_ALL_ACCOUNTS_BY_USER:
        return await this.runCommand(new GetAllAccountsByUserCreator());
      case CommandType.GET_ALL_ACCOUNTS_BY_BANK:
        return await this.runCommand(new GetAllAccountsByBankCreator());
      case CommandType.GET_ALL_ACCOUNTS_BY_USER_AND_BANK:
        return await this.runCommand(new GetAllAccountsByUserAndBankCreator());
      case CommandType.UPDATE_ACCOUNT:
        return await this.runCommand(new UpdateAccountCreator());
      case CommandType.DELETE_ACCOUNT:
        return await this.runCommand(new DeleteAccountCreator());
      case CommandType.CREATE_TRANSACTION:
        return await this.runCommand(new CreateTransactionCreator());
      case CommandType.GET_TRANSACTIONS:
        return await this.runCommand(new GetTransactionsCreator());
      case CommandType.GET_TRANSACTION:
        return await this.runCommand(new GetTransactionCreator());
      case CommandType.GET_ALL_TRANSACTIONS_BY_ACCOUNT:
        return this.runCommand(new GetAllTransactionsByAccountCreator());
      case CommandType.HELP:
        return this.runCommand(new HelpCreator());
      default:
        throw new CommandLineParserException('invalid commands');
    }
  }

  private async runCommand(creatorCommand: CreatorCommand): Promise<string> {
    return await creatorCommand.executeCommand(this.params);
  }
}
