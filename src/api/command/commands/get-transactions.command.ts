import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { ITransactionService } from '../../../service/interface/transaction.service';
import { TransactionModel } from '../../../model/interface/transaction.model';

@Injectable()
export class GetTransactionsCommand extends Command {
  constructor(private readonly transactionService: ITransactionService) {
    super();
  }

  async executeMainLogic(): Promise<TransactionModel[]> {
    return await this.transactionService.getAll();
  }

  getCommandDescription(): string {
    return `Get all transactions

    Options:
      help                              Display help for command
    `;
  }
}
