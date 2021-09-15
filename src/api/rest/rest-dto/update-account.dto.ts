import { IsEnum, IsNumber } from 'class-validator';
import { OperationType } from '../../../types/operation.type';

export class UpdateAccountDto {
  @IsNumber()
  readonly amount: number;

  @IsEnum(OperationType)
  readonly operation: OperationType;
}
