import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { ITransactionService } from '../../../service/interface/transaction.service';
import { ParamsDefinition } from '../values-object/params-definition';
import { CommandResult } from '../values-object/command-result';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';

@Injectable()
export class GetTransactionsCommand extends BaseCommand {
  constructor(private readonly transactionService: ITransactionService) {
    super();
  }

  async execute(typedCommandDescriptor: TypedCommandDescriptor): Promise<CommandResult> {
    const helpResult = await super.execute(typedCommandDescriptor);

    if (helpResult) {
      return helpResult;
    }

    const result = await this.transactionService.getAll();

    return { result };
  }

  getCommandDescription(): string {
    return `Get all transactions

    Options:
      help                              Display help for command
    `;
  }

  initParamsDefinition(): ParamsDefinition {
    return {};
  }
}
