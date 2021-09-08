import { Injectable } from '@nestjs/common';
import { TransactionService } from '../../../service/transaction.service';
import { TransactionModel } from '../../../model/interface/transaction.model';
import { Command } from './command';
import { GetAllTransactionsByAccountDto } from 'src/api/rest-dto/get-all-transactions-by-account.dto';

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

  async performAdditionally(model: GetAllTransactionsByAccountDto): Promise<TransactionModel[]> {
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
