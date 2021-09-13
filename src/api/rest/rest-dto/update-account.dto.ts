import { OperationType } from 'src/types/operation.type';

export class UpdateAccountDto {
  readonly amount: number;
  readonly operation: OperationType;
}
