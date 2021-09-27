import { ApiProperty } from '@nestjs/swagger';
import { BankModel } from './bank.model';
import { BaseModel } from './base.model';

export class RateModel extends BaseModel {
  @ApiProperty()
  bankId: string;

  @ApiProperty()
  rubUsd: number;

  @ApiProperty()
  rubEur: number;

  @ApiProperty()
  usdEur: number;

  bank?: BankModel;
}
