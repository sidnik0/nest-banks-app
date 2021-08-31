import { Injectable } from '@nestjs/common';
import { TransactionService } from '../../../service/transaction.service';
import { Command } from './command';
import { CommandDescriptor } from '../interface/command-descriptor';
import { CommandResult } from '../interface/command-result';
import { getTransactionsHelp } from './helps-string';

@Injectable()
export class GetTransactionsCommand extends Command {
  constructor(private readonly transactionService: TransactionService) {
    super();

    this.requiredProperties = {
      id: 'string',
    };
  }
  async execute({ params }: CommandDescriptor): Promise<CommandResult> {
    const flags = this.getOptionalFlags(params);

    if (flags.includes('help')) return { result: getTransactionsHelp };

    const result = await this.transactionService.getAll();

    return { result };
  }
}
