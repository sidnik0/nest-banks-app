import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from './base.model';

export class RateModel extends BaseModel {
  @ApiProperty()
  bankId: string;

  @ApiProperty()
  RUB_USD: number;

  @ApiProperty()
  RUB_EUR: number;

  @ApiProperty()
  USD_EUR: number;
}
