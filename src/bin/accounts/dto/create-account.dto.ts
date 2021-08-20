import { CurrencyType } from '../../../types/currency.type';

export class CreateAccountDto {
  readonly idUser: string;
  readonly idBank: string;
  readonly currency: CurrencyType;
  readonly balance?: number;
}
