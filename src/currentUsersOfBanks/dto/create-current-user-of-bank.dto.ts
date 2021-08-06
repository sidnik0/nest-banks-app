import { CreateAccountDto } from '../../accounts/dto/create-account.dto';
import { CurrencyType } from '../../types/currency/currency.type';

export class CreateCurrentUserOfBankDto implements CreateAccountDto {
  readonly idUser: string;
  readonly idBank: string;
  readonly currency: CurrencyType;
  readonly balance?: number;
}
