import { Injectable } from '@nestjs/common';
import { TransactionService } from '../../../service/transaction.service';
import { TransactionModel } from '../../../model/interface/transaction.model';
import { Command } from './command';

@Injectable()
export class GetTransactionsCommand extends Command {
  constructor(private readonly transactionService: TransactionService) {
    super();
  }

  async performAdditionally(): Promise<TransactionModel[]> {
    return await this.transactionService.getAll();
  }

  getCommandDescription(): string {
    return `Get all transactions

    Options:
      help                              Display help for command
    `;
  }
}
