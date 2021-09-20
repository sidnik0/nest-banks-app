import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { ITransactionService } from '../../../service/interface/transaction.service';
import { ParamsDefinition } from '../values-object/params-definition';
import { CommandResult } from '../values-object/command-result';

@Injectable()
export class TransactionGetAllCommand extends BaseCommand {
  constructor(private readonly transactionService: ITransactionService) {
    super();
  }

  async doExecute(): Promise<CommandResult> {
    const result = await this.transactionService.getAll();

    return { result, initStringResult: 'List transactions' };
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
