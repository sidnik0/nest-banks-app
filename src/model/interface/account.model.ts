import { BaseModel } from './base.model';
import { CurrencyType } from '../../types/currency.type';

export interface AccountModel extends BaseModel {
  userId: string;
  bankId: string;
  currency: CurrencyType;
  balance: number;
}
