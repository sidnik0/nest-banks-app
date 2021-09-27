import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from './base.model';
import { CurrencyType } from '../../types/currency.type';
import { UserModel } from './user.model';
import { BankModel } from './bank.model';

export class AccountModel extends BaseModel {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  bankId: string;

  @ApiProperty()
  currency: CurrencyType;

  @ApiProperty()
  balance: number;

  user?: UserModel;

  bank?: BankModel;
}
