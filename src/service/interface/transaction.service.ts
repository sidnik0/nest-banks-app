import { IBaseService } from './base.service';
import { TransactionModel } from '../../model/interface/transaction.model';
import { CreateTransactionDto } from '../../api/rest-dto/create-transaction.dto';

export abstract class ITransactionService extends IBaseService<TransactionModel> {
  abstract createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionModel>;
  abstract getAllByAccount(id: string): Promise<TransactionModel[]>;
}
