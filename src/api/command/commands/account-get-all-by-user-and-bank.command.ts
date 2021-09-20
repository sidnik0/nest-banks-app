import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { IAccountService } from '../../../service/interface/account.service';
import { ParamsDefinition } from '../values-object/params-definition';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';
import { CommandResult } from '../values-object/command-result';

@Injectable()
export class AccountGetAllByUserAndBankCommand extends BaseCommand {
  constructor(private readonly accountService: IAccountService) {
    super();
  }

  async doExecute({ params }: TypedCommandDescriptor): Promise<CommandResult> {
    const result = await this.accountService.getAllByUserAndBank(params.userId, params.bankId);

    return { result, initStringResult: 'List accounts' };
  }

  getCommandDescription(): string {
    return `Get all user accounts in the bank

    Options:
      userId=<userId>                       User id
      bankId=<bankId>                       Bank id
    
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
    };
  }
}
