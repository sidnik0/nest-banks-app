import { IsNumber, IsOptional } from 'class-validator';

export class UpdateRateDto {
  @IsOptional()
  @IsNumber()
  readonly RUB_USD?: string;

  @IsOptional()
  @IsNumber()
  readonly RUB_EUR?: number;

  @IsOptional()
  @IsNumber()
  readonly USD_EUR?: number;
}
