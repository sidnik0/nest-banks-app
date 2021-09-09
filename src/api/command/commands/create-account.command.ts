import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { IAccountService } from '../../../service/interface/account.service';
import { AccountModel } from '../../../model/interface/account.model';
import { CreateAccountDto } from '../../rest-dto/create-account.dto';

@Injectable()
export class CreateAccountCommand extends Command {
  constructor(private readonly accountService: IAccountService) {
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
        required: false,
      },
      currency: {
        type: 'CurrencyType',
        required: true,
      },
    };
  }

  async executeMainLogic(model: CreateAccountDto): Promise<AccountModel> {
    return await this.accountService.create(model as AccountModel);
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
