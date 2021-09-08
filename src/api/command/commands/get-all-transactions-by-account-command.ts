import { Injectable } from '@nestjs/common';
import { TransactionService } from '../../../service/transaction.service';
import { TransactionModel } from '../../../model/interface/transaction.model';
import { Command } from './command';

@Injectable()
export class GetAllTransactionsByAccountCommand extends Command {
  constructor(private readonly transactionService: TransactionService) {
    super();

    this.paramsDefinition = {
      id: {
        type: 'string',
        required: true,
      },
    };
  }

  async performAdditionally(model: TransactionModel): Promise<TransactionModel[]> {
    return await this.transactionService.getAllByAccount(model.id);
  }

  getCommandDescription(): string {
    return `Get all account transactions

    Options:
      id=<bankId>                       Bank id
    
      help                              Display help for command
    `;
  }
}
