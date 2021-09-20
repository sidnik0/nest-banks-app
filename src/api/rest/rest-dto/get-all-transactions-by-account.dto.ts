import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class GetAllTransactionsByAccountDto {
  @ApiPropertyOptional({
    description: 'From date',
  })
  @IsOptional()
  @IsDateString()
  from?: Date;

  @ApiPropertyOptional({
    description: 'To date',
  })
  @IsOptional()
  @IsDateString()
  to?: Date;
}
