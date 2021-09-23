import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDataURI, IsDateString, IsOptional } from 'class-validator';

export class GetAllTransactionsByAccountDto {
  @ApiPropertyOptional({
    description: 'From date',
  })
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiPropertyOptional({
    description: 'To date',
  })
  @IsOptional()
  @IsDateString()
  to?: string;
}
