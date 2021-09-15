import { IsDateString } from 'class-validator';

export class GetAllTransactionsByAccountDto {
  @IsDateString()
  from?: Date;

  @IsDateString()
  to?: Date;
}
