import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateRateDto {
  @ApiPropertyOptional({
    description: 'Rate RUB-USD',
  })
  @IsOptional()
  @IsNumber()
  readonly rubUsd?: number;

  @ApiPropertyOptional({
    description: 'Rate RUB-EUR',
  })
  @IsOptional()
  @IsNumber()
  readonly rubEur?: number;

  @ApiPropertyOptional({
    description: 'Rate USD-EUR',
  })
  @IsOptional()
  @IsNumber()
  readonly usdEur?: number;
}
