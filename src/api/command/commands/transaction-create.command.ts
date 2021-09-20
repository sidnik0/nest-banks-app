import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { ITransactionService } from '../../../service/interface/transaction.service';
import { TransactionModel } from '../../../model/interface/transaction.model';
import { ParamsDefinition } from '../values-object/params-definition';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';
import { CommandResult } from '../values-object/command-result';

@Injectable()
export class TransactionCreateCommand extends BaseCommand {
  constructor(private readonly transactionService: ITransactionService) {
    super();
  }

  async doExecute({ params }: TypedCommandDescriptor): Promise<CommandResult> {
    const result = await this.transactionService.createTransaction(params as TransactionModel);

    return { result, initStringResult: 'Transaction' };
  }

  getCommandDescription(): string {
    return `Create transaction

    Options:
      fromAccountId=<fromAccountId>     From account
      toAccountId=<toAccountId>         To account
      amount=<amount>                   Amount
      
      help                              Display help for command
    `;
  }

  initParamsDefinition(): ParamsDefinition {
    return {
      fromAccountId: {
        type: 'string',
        required: true,
      },
      toAccountId: {
        type: 'string',
        required: true,
      },
      amount: {
        type: 'number',
        required: true,
      },
    };
  }
}
