import { BaseRepository } from './base.repository';
import { TransactionModel } from '../../model/interface/transaction.model';

export abstract class TransactionRepository extends BaseRepository<TransactionModel> {
  abstract getAllByAccount(
    id: string,
    period?: { from: Date; to: Date },
  ): Promise<TransactionModel[]>;
}
