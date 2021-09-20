import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { OperationType } from '../../../types/operation.type';

export class UpdateAccountDto {
  @ApiProperty({
    description: 'Amount money',
  })
  @IsNumber()
  readonly amount: number;

  @ApiProperty({
    enum: OperationType,
    description: 'Type of transaction',
  })
  @IsEnum(OperationType)
  readonly operation: OperationType;
}
