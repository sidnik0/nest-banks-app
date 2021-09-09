import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { IAccountService } from '../../../service/interface/account.service';
import { AccountModel } from '../../../model/interface/account.model';

@Injectable()
export class GetAccountsCommand extends Command {
  constructor(private readonly accountService: IAccountService) {
    super();
  }

  async executeMainLogic(): Promise<AccountModel[]> {
    return await this.accountService.getAll();
  }

  getCommandDescription(): string {
    return `Get all accounts

    Options:
      help                              Display help for command
    `;
  }
}
