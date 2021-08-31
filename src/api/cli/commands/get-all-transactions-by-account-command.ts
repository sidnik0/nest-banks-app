import { Injectable } from '@nestjs/common';
import { TransactionService } from '../../../service/transaction.service';
import { TransactionModel } from '../../../model/interface/transaction.model';
import { Command } from './command';
import { CommandDescriptor } from '../interface/command-descriptor';
import { CommandResult } from '../interface/command-result';
import { getAllTransactionsByAccountHelp } from './helps-string';

@Injectable()
export class GetAllTransactionsByAccountCommand extends Command {
  constructor(private readonly transactionService: TransactionService) {
    super();

    this.requiredProperties = {
      id: 'string',
    };
  }
  async execute({ params }: CommandDescriptor): Promise<CommandResult> {
    const flags = this.getOptionalFlags(params);

    if (flags.includes('help'))
      return { result: getAllTransactionsByAccountHelp };

    const model = this.validateAndParseProperties<TransactionModel>(params);

    const result = await this.transactionService.getAllByAccount(model.id);

    return { result };
  }
}
