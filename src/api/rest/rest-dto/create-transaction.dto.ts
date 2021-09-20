import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'From account',
  })
  @IsUUID()
  readonly fromAccountId: string;

  @ApiProperty({
    description: 'To account',
  })
  @IsUUID()
  readonly toAccountId: string;

  @ApiProperty({
    description: 'Transaction amount money',
  })
  @IsNumber()
  readonly amount: number;
}
