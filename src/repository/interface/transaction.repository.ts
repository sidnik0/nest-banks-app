import { BaseRepository } from './base.repository';
import { TransactionModel } from '../../model/transaction.model';

export abstract class TransactionRepository extends BaseRepository<TransactionModel> {
  abstract getByAccount(
    id: string,
    period?: { from: number; to: number },
  ): Promise<Array<TransactionModel>>;
}
