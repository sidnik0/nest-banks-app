import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { ITransactionService } from '../../../service/interface/transaction.service';
import { ParamsDefinition } from '../values-object/params-definition';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';
import { CommandResult } from '../values-object/command-result';

@Injectable()
export class GetAllTransactionsByAccountCommand extends BaseCommand {
  constructor(private readonly transactionService: ITransactionService) {
    super();
  }

  async execute(typedCommandDescriptor: TypedCommandDescriptor, errorMessages?: string[]): Promise<CommandResult> {
    const { params } = typedCommandDescriptor;

    const helpResult = await super.execute(typedCommandDescriptor, errorMessages);

    if (helpResult) {
      return helpResult;
    }

    delete params['help'];

    const result = await this.transactionService.getAllByAccount(params.id);

    return { result };
  }

  getCommandDescription(): string {
    return `Get all account transactions

    Options:
      id=<bankId>                       Bank id
    
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
