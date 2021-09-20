import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { ITransactionService } from '../../../service/interface/transaction.service';
import { ParamsDefinition } from '../values-object/params-definition';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';
import { CommandResult } from '../values-object/command-result';

@Injectable()
export class TransactionGetCommand extends BaseCommand {
  constructor(private readonly transactionService: ITransactionService) {
    super();
  }

  async doExecute({ params }: TypedCommandDescriptor): Promise<CommandResult> {
    const result = await this.transactionService.get(params.id);

    return { result, initStringResult: 'Transaction' };
  }

  getCommandDescription(): string {
    return `Get transaction by id

    Options:
      id=<transactionId>                Transaction id
      
      help                              Display help for command
    `;
  }

  initParamsDefinition(): ParamsDefinition {
    return {
      id: {
        type: 'string',
        required: true,
      },
    };
  }
}
