export interface TransactionModel {
  id: string;
  fromAccountId: string;
  toAccountId: string;
  value: number;
  create: number;
}
