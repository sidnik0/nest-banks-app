import { CurrencyType } from '../../types/currency/currency.type';

export interface AccountInterface {
  id: string;
  idUser: string;
  idBank: string;
  currency: CurrencyType;
  balance: number;
}
