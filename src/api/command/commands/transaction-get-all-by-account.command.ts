import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { ITransactionService } from '../../../service/interface/transaction.service';
import { ParamsDefinition } from '../values-object/params-definition';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';
import { CommandResult } from '../values-object/command-result';

@Injectable()
export class TransactionGetAllByAccountCommand extends BaseCommand {
  constructor(private readonly transactionService: ITransactionService) {
    super();
  }

  async doExecute({ params }: TypedCommandDescriptor): Promise<CommandResult> {
    const result = await this.transactionService.getAllByAccount(params.id, { from: params.from, to: params.to });

    return { result, initStringResult: 'List transactions' };
  }

  getCommandDescription(): string {
    return `Get all account transactions

    Options:
      id=<bankId>                       Bank id
      from=[from]                       From time(yy-mm-dd)
      to=[to]                           To time(yy-mm-dd)
    
      help                              Display help for command
    `;
  }

  initParamsDefinition(): ParamsDefinition {
    return {
      id: {
        type: 'string',
        required: true,
      },
      from: {
        type: 'Date',
        required: false,
      },
      to: {
        type: 'Date',
        required: false,
      },
    };
  }
}
