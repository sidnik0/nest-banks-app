import { CurrencyType } from '../../../types/currency/currency.type';

export class CreateAccountDto {
  readonly idUser: string;
  readonly idBank: string;
  readonly currency: CurrencyType;
  readonly balance?: number;
}
