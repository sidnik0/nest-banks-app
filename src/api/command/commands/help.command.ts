import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { CommandResult } from '../interface/command-result';


@Injectable()
export class HelpCommand extends Command {
  async execute(): Promise<CommandResult> {
    return { result: this.getCommandDescription() };
  }

  async executeMainLogic(): Promise<never> {
    throw new Error('Prohibited operation')
  }

  getCommandDescription(): string {
    return `Options:
    help                                        Display help for command
  
  Commands:
    create-account [options]                    Create account
    create-bank [options]                       Create bank
    create-transaction [options]                Create transaction
    create-user [options]                       Create user
    delete-account [options]                    Delete account by id
    delete-bank [options]                       Delete bank by id
    delete-user [options]                       Delete user by id
    get-account [options]                       Get account by id
    get-accounts [options]                      Get all accounts
    get-all-accounts-by-bank [options]          Get all bank accounts
    get-all-accounts-by-user-and-bank [options] Get all user accounts in the bank
    get-all-accounts-by-user [options]          Get all user accounts
    get-all-bank-users [options]                Get all users in the bank
    get-all-transactions-by-account [options]   Get all account transactions
    get-all-user-banks [options]                Get all user banks
    get-bank [options]                          Get bank by id
    get-banks                                   Get all banks
    get-transaction [options]                   Get transaction by id
    get-transactions                            Get all transactions
    get-user [options]                          Get user by id
    get-users                                   Get all users
    update-account [options]                    Update account by id
    update-bank [options]                       Update bank by id
    update-user [options]                       Update user by id
    exit                                        Close app
  `;
  }
}