export interface TransactionInterface {
  id: string;
  fromAccountId: string;
  toAccountId: string;
  value: number;
  create: number;
}
