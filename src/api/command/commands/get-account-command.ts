import { Injectable } from '@nestjs/common';
import { AccountService } from '../../../service/account.service';
import { AccountModel } from '../../../model/interface/account.model';
import { Command } from './command';

@Injectable()
export class GetAccountCommand extends Command {
  constructor(private readonly accountService: AccountService) {
    super();

    this.paramsDefinition = {
      id: {
        type: 'string',
        required: true,
      },
    };
  }

  async performAdditionally(model: AccountModel): Promise<AccountModel> {
    return await this.accountService.get(model.id);
  }

  getCommandDescription(): string {
    return `Get account by id

    Options:
      id=<accountId>                    Account id
      
      help                              Display help for command
    `;
  }
}
