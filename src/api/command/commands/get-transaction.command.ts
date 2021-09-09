import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { ITransactionService } from '../../../service/interface/transaction.service';
import { TransactionModel } from '../../../model/interface/transaction.model';
import { GetTransactionDto } from '../../rest-dto/get-transaction.dto';

@Injectable()
export class GetTransactionCommand extends Command {
  constructor(private readonly transactionService: ITransactionService) {
    super();

    this.paramsDefinition = {
      id: {
        type: 'string',
        required: true,
      },
    };
  }

  async executeMainLogic(model: GetTransactionDto): Promise<TransactionModel> {
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
