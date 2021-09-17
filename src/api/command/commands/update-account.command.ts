import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { IAccountService } from '../../../service/interface/account.service';
import { ParamsDefinition } from '../values-object/params-definition';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';
import { CommandResult } from '../values-object/command-result';
import { OperationType } from '../../../types/operation.type';

@Injectable()
export class UpdateAccountCommand extends BaseCommand {
  constructor(private readonly accountService: IAccountService) {
    super();
  }

  async doExecute({ params: { id, ...params } }: TypedCommandDescriptor): Promise<CommandResult> {
    const result = await this.accountService.updateBalance(id, params as { amount: number; operation: OperationType });

    return { result, initStringResult: 'Account' };
  }

  getCommandDescription(): string {
    return `Update account by id

    Options:
      id=<accountId>                    Account id
      amount=<amount>                   Amount
      operation=<boolean>               Operation ("replenishment" || "withdrawal")
      
      help                              Display help for command
    `;
  }

  initParamsDefinition(): ParamsDefinition {
    return {
      id: {
        type: 'string',
        required: true,
      },
      amount: {
        type: 'number',
        required: true,
      },
      operation: {
        type: 'OperationType',
        required: true,
      },
    };
  }
}
