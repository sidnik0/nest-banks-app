import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { ITransactionService } from '../../../service/interface/transaction.service';
import { ParamsDefinition } from '../values-object/params-definition';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';
import { CommandResult } from '../values-object/command-result';

@Injectable()
export class GetTransactionCommand extends BaseCommand {
  constructor(private readonly transactionService: ITransactionService) {
    super();

    this.paramsDefinition = {
      id: {
        type: 'string',
        required: true,
      },
    };
  }

  async execute({ params }: TypedCommandDescriptor): Promise<CommandResult> {
    const result = await this.transactionService.get(params.id);

    return { result };
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
