import { IBaseRepository } from './base.repository';
import { TransactionModel } from '../../model/interface/transaction.model';

export abstract class ITransactionRepository extends IBaseRepository<TransactionModel> {
  abstract getAllByAccount(id: string, period?: { from: Date; to: Date }): Promise<TransactionModel[]>;
}
