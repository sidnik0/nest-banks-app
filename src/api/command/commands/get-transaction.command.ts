import { Injectable } from '@nestjs/common';
import { TransactionService } from '../../../service/transaction.service';
import { TransactionModel } from '../../../model/interface/transaction.model';
import { Command } from './command';
import { GetTransactionDto } from 'src/api/rest-dto/get-transaction.dto';

@Injectable()
export class GetTransactionCommand extends Command {
  constructor(private readonly transactionService: TransactionService) {
    super();

    this.paramsDefinition = {
      id: {
        type: 'string',
        required: true,
      },
    };
  }

  async performAdditionally(model: GetTransactionDto): Promise<TransactionModel> {
    return await this.transactionService.get(model.id);
  }

  getCommandDescription(): string {
    return `Get transaction by id

    Options:
      id=<transactionId>                Transaction id
      
      help                              Display help for command
    `;
  }
}
