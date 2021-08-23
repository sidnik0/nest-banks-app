import { BaseModel } from './base.model';

export interface TransactionModel extends BaseModel {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  createAt: Date;
}
