import { ApiProperty } from '@nestjs/swagger';
import { BankModel } from './bank.model';
import { BaseModel } from './base.model';

export class RateModel extends BaseModel {
  @ApiProperty()
  bankId: string;

  @ApiProperty()
  bynUsd: number;

  @ApiProperty()
  bynEur: number;

  @ApiProperty()
  usdEur: number;

  bank?: BankModel;
}
