import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { ITransactionService } from '../../../service/interface/transaction.service';
import { TransactionModel } from '../../../model/interface/transaction.model';
import { GetAllTransactionsByAccountDto } from '../../rest-dto/get-all-transactions-by-account.dto';

@Injectable()
export class GetAllTransactionsByAccountCommand extends Command {
  constructor(private readonly transactionService: ITransactionService) {
    super();

    this.paramsDefinition = {
      id: {
        type: 'string',
        required: true,
      },
    };
  }

  async executeMainLogic(
    model: GetAllTransactionsByAccountDto,
  ): Promise<TransactionModel[]> {
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
