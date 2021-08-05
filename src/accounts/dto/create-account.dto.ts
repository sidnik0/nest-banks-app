import { CurrencyType } from '../../types/currency/currency.type';

export class CreateAccountDto {
  id: string;
  idUser: string;
  idBank: string;
  currency: CurrencyType;
  balance?: number;
}
