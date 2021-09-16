import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { IAccountService } from '../../../service/interface/account.service';
import { ParamsDefinition } from '../values-object/params-definition';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';
import { CommandResult } from '../values-object/command-result';

@Injectable()
export class GetAllAccountsByUserAndBankCommand extends BaseCommand {
  constructor(private readonly accountService: IAccountService) {
    super();
  }

  async execute(typedCommandDescriptor: TypedCommandDescriptor): Promise<CommandResult> {
    const { params } = typedCommandDescriptor;

    const helpResult = await super.execute(typedCommandDescriptor);

    if (helpResult) {
      return helpResult;
    }

    delete params['help'];

    const result = await this.accountService.getAllByUserAndBank(params.userId, params.bankId);

    return { result };
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
