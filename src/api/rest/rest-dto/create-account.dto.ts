import { IsEnum, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CurrencyType } from '../../../types/currency.type';

export class CreateAccountDto {
  @ApiProperty({
    description: 'Account owner',
  })
  @IsUUID()
  readonly userId: string;

  @ApiProperty({
    description: 'Bank account',
  })
  @IsUUID()
  readonly bankId: string;

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
