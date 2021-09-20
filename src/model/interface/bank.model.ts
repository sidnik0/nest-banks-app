import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from './base.model';

export class BankModel extends BaseModel {
  @ApiProperty()
  name: string;

  @ApiProperty()
  commissionForEntity: number;

  @ApiProperty()
  commissionForIndividual: number;
}
