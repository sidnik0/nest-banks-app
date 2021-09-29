import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { CommandResult } from '../values-object/command-result';
import { ParamsDefinition } from '../values-object/params-definition';

@Injectable()
export class HelpCommand extends BaseCommand {
  async doExecute(): Promise<CommandResult> {
    return { result: this.getCommandDescription() };
  }

  getCommandDescription(): string {
    return `Options:
    help                                        Display help for command
  
  Commands:
    account-create [options]                    Create account
    account-get [options]                       Get account by id
    account-get-all [options]                   Get all accounts
    account-get-all-by-bank [options]           Get all bank accounts
    account-get-all-by-user-and-bank [options]  Get all user accounts in the bank
    account-get-all-by-user [options]           Get all user accounts
    account-update [options]                    Update account by id
    account-delete [options]                    Delete account by id

    bank-create [options]                       Create bank
    bank-get [options]                          Get bank by id
    bank-get-all [options]                      Get all banks
    bank-get-all-users [options]                Get all users in the bank
    bank-update [options]                       Update bank by id
    bank-delete [options]                       Delete bank by id

    rate-get [options]                          Get rate by bank
    rate-get-all [options]                      Get all rates
    rate-update [options]                       Update rate by bank
    
    transaction-create [options]                Create transaction
    transaction-get [options]                   Get transaction by id
    transaction-get-all [options]               Get all transactions
    transaction-get-all-by-account [options]    Get all account transactions
    
    user-create-with-account [options]          Create user with account
    user-create [options]                       Create user
    user-get [options]                          Get user by id
    user-get-all [options]                      Get all users
    user-get-all-banks [options]                Get all user banks
    user-update [options]                       Update user by id
    user-delete [options]                       Delete user by id
    
    exit                                        Close app
  `;
  }

  initParamsDefinition(): ParamsDefinition {
    return {};
  }
}
