import { CurrencyType } from '../../types/currency.type';

export interface AccountModel {
  id?: string;
  userBankId: string;
  currency: CurrencyType;
  balance: number;
}
