import { CurrencyType } from '../../types/currency/currency.type';

export class CreateAccountDto {
  idUser: string;
  idBank: string;
  currency: CurrencyType;
  balance?: number;
}
