import { CurrencyType } from "src/types/currency.type";

export class CreateAccountDto {
  readonly userId: string;
  readonly bankId: string;
  readonly currency: CurrencyType;
  readonly balance?: number;
}
