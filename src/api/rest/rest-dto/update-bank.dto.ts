import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBankDto {
  @ApiPropertyOptional({
    description: 'Bank name',
  })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiPropertyOptional({
    description: 'Commission for entity',
  })
  @IsOptional()
  @IsNumber()
  readonly commissionForEntity?: number;

  @ApiPropertyOptional({
    description: 'Commission for individual',
  })
  @IsOptional()
  @IsNumber()
  readonly commissionForIndividual?: number;
}
