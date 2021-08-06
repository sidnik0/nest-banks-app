import { TransactionInterface } from './transaction.interface';

export interface AllTransactionInterface {
  from: Array<TransactionInterface>;
  to: Array<TransactionInterface>;
}
