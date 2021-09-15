import { IsEnum, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { CurrencyType } from '../../../types/currency.type';

export class CreateAccountDto {
  @IsUUID()
  readonly userId: string;

  @IsUUID()
  readonly bankId: string;

  @IsEnum(CurrencyType)
  readonly currency: CurrencyType;

  @IsOptional()
  @IsNumber()
  readonly balance?: number;
}
