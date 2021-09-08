import { Injectable } from '@nestjs/common';
import { TransactionService } from '../../../service/transaction.service';
import { TransactionModel } from '../../../model/interface/transaction.model';
import { Command } from './command';
import { CreateTransactionDto } from 'src/api/rest-dto/create-transaction.dto';

@Injectable()
export class CreateTransactionCommand extends Command {
  constructor(private readonly transactionService: TransactionService) {
    super();

    this.paramsDefinition = {
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

  async performAdditionally(model: CreateTransactionDto): Promise<TransactionModel> {
    return await this.transactionService.createTransaction(model);
  }

  getCommandDescription(): string {
    return `Create transaction

    Options:
      fromAccountId=<fromId>            From account
      toAccountId=<toId>                To account
      amount=<value>                    Amount
      
      help                              Display help for command
    `;
  }
}
