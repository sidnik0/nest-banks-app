import { Injectable } from '@nestjs/common';
import { AccountService } from '../../../service/account.service';
import { AccountModel } from '../../../model/interface/account.model';

import { Command } from './command';
@Injectable()
export class GetAccountsCommand extends Command {
  constructor(private readonly accountService: AccountService) {
    super();
  }

  async performAdditionally(): Promise<AccountModel[]> {
    return await this.accountService.getAll();
  }

  getCommandDescription(): string {
    return `Get all accounts

    Options:
      help                              Display help for command
    `;
  }
}
