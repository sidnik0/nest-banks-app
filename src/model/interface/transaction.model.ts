import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from './base.model';

export class TransactionModel extends BaseModel {
  @ApiProperty()
  fromAccountId: string;

  @ApiProperty()
  toAccountId: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  createAt: Date;
}
