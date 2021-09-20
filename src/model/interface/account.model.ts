import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from './base.model';
import { CurrencyType } from '../../types/currency.type';

export class AccountModel extends BaseModel {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  bankId: string;

  @ApiProperty()
  currency: CurrencyType;

  @ApiProperty()
  balance: number;
}
