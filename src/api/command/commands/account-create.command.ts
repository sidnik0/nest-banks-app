import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { IAccountService } from '../../../service/interface/account.service';
import { AccountModel } from '../../../model/interface/account.model';
import { ParamsDefinition } from '../values-object/params-definition';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';
import { CommandResult } from '../values-object/command-result';

@Injectable()
export class AccountCreateCommand extends BaseCommand {
  constructor(private readonly accountService: IAccountService) {
    super();
  }

  async doExecute({ params }: TypedCommandDescriptor): Promise<CommandResult> {
    const result = await this.accountService.create(params as AccountModel);

    return { result, initStringResult: 'Account' };
  }

  getCommandDescription(): string {
    return `Create account

    Options:
      userId=<userId>                   User id
      bankId=<bankId>                   Bank id
      balance=[balance]                 Starting balance
      currency=<currency>               Currency ("RUB" || "USD" || "EUR")
      
      help                              Display help for command
    `;
  }

  initParamsDefinition(): ParamsDefinition {
    return {
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
}
