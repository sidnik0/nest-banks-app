import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateBankDto {
  @ApiProperty({
    description: 'Bank name',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Commission for entity',
  })
  @IsNumber()
  readonly commissionForEntity: number;

  @ApiProperty({
    description: 'Commission for individual',
  })
  @IsNumber()
  readonly commissionForIndividual: number;

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
