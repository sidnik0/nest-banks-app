import { TransactionsModelFs } from '../../models/transactionsModel/transactions.model.fs';

export abstract class TransactionsRepository {
  abstract create(
    createData: TransactionsModelFs,
  ): Promise<TransactionsModelFs>;

  abstract getById(idTransaction: string): Promise<TransactionsModelFs>;

  abstract getByIdAccount(
    idAccount: string,
    period?: { from: number; to: number },
  ): Promise<Array<TransactionsModelFs>>;

  abstract get(): Promise<Array<TransactionsModelFs>>;
}
