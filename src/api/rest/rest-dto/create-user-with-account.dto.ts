import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { CurrencyType } from '../../../types/currency.type';
import { FaceType } from '../../../types/face.type';

export class CreateUserWithAccountDto {
  @ApiProperty({
    description: 'User name',
  })
  @IsString()
  readonly userName: string;

  @ApiProperty({
    enum: FaceType,
    description: 'User face',
  })
  @IsEnum(FaceType)
  readonly face: FaceType;

  @ApiProperty({
    description: 'Bank name',
  })
  @IsString()
  readonly bankName: string;

  @ApiPropertyOptional({
    description: 'Commission for entity',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly commissionForEntity?: number;

  @ApiPropertyOptional({
    description: 'Commission for individual',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly commissionForIndividual?: number;

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

  @ApiProperty({
    enum: CurrencyType,
    description: 'Account currency',
  })
  @IsEnum(CurrencyType)
  readonly currency: CurrencyType;

  @ApiPropertyOptional({
    description: 'Starting balance',
  })
  @IsOptional()
  @IsNumber()
  readonly balance?: number;
}
