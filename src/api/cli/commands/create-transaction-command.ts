import { Injectable } from '@nestjs/common';
import { TransactionService } from '../../../service/transaction.service';
import { TransactionModel } from '../../../model/interface/transaction.model';
import { Command } from './command';
import { CommandDescriptor } from '../interface/command-descriptor';
import { CommandResult } from '../interface/command-result';
import { createTransactionHelp } from './helps-string';

@Injectable()
export class CreateTransactionCommand extends Command {
  constructor(private readonly transactionService: TransactionService) {
    super();

    this.requiredProperties = {
      fromAccountId: 'string',
      toAccountId: 'string',
      amount: 'number',
    };
  }
  async execute({ params }: CommandDescriptor): Promise<CommandResult> {
    const flags = this.getOptionalFlags(params);

    if (flags.includes('help')) return { result: createTransactionHelp };

    params.set('createAt', new Date().toString());

    const model = this.validateAndParseProperties<TransactionModel>(params);

    const result = await this.transactionService.create(
      model.fromAccountId,
      model.toAccountId,
      model.amount,
    );

    return { result };
  }
}
