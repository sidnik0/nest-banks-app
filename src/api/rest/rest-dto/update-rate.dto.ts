import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateRateDto {
  @ApiPropertyOptional({
    description: 'Rate RUB-USD',
  })
  @IsOptional()
  @IsNumber()
  @Min(0.01)
  readonly rubUsd?: number;

  @ApiPropertyOptional({
    description: 'Rate RUB-EUR',
  })
  @IsOptional()
  @IsNumber()
  @Min(0.01)
  readonly rubEur?: number;

  @ApiPropertyOptional({
    description: 'Rate USD-EUR',
  })
  @IsOptional()
  @IsNumber()
  @Min(0.01)
  readonly usdEur?: number;
}
