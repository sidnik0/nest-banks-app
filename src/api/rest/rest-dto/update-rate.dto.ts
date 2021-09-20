import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateRateDto {
  @ApiPropertyOptional({
    description: 'Rate RUB-USD',
  })
  @IsOptional()
  @IsNumber()
  readonly RUB_USD?: number;

  @ApiPropertyOptional({
    description: 'Rate RUB-EUR',
  })
  @IsOptional()
  @IsNumber()
  readonly RUB_EUR?: number;

  @ApiPropertyOptional({
    description: 'Rate USD-EUR',
  })
  @IsOptional()
  @IsNumber()
  readonly USD_EUR?: number;
}
