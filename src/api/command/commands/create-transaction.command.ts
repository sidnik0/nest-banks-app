import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { ITransactionService } from '../../../service/interface/transaction.service';
import { TransactionModel } from '../../../model/interface/transaction.model';
import { CreateTransactionDto } from '../../rest-dto/create-transaction.dto';

@Injectable()
export class CreateTransactionCommand extends Command {
  constructor(private readonly transactionService: ITransactionService) {
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

  async executeMainLogic(
    model: CreateTransactionDto,
  ): Promise<TransactionModel> {
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
