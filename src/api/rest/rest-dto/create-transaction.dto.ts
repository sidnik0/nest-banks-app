import { IsNumber, IsUUID } from 'class-validator';

export class CreateTransactionDto {
  @IsUUID()
  readonly fromAccountId: string;

  @IsUUID()
  readonly toAccountId: string;

  @IsNumber()
  readonly amount: number;
}
