import { ApiProperty } from '@nestjs/swagger';
import { AccountModel } from './account.model';
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

  fromAccount?: AccountModel;

  toAccount?: AccountModel;
}
