import { CurrencyType } from '../../types/currency/currency.type';

export interface AccountsModelFs {
  id: string;
  idUser: string;
  idBank: string;
  currency: CurrencyType;
  balance: number;
}
