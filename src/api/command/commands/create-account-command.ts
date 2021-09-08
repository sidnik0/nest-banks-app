import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { AccountService } from '../../../service/account.service';
import { AccountModel } from '../../../model/interface/account.model';


@Injectable()
export class CreateAccountCommand extends Command {
  constructor(private readonly accountService: AccountService) {
    super();

    this.paramsDefinition = {
      userId: {
        type: 'string', 
        required: true,
      },
      bankId: {
        type: 'string',
        required: true,
      },
      balance: {
        type: 'number',
        required: true,
      },
      currency: {
        type: 'CurrencyType',
        required: true,
      },
    };
  }

  async performAdditionally(model: AccountModel): Promise<AccountModel> {
    return await this.accountService.create(model);
  }

  getCommandDescription(): string {
    return `Create account

    Options:
      userId=<userId>                   User id
      bankId=<bankId>                   Bank id
      balance=<balance>                 Starting balance
      currency=<currency>               Currency ("RUB" || "USD" || "EUR")
      
      help                              Display help for command
    `;
  }
}
