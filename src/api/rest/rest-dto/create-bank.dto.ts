import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

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

  @ApiProperty({
    description: 'Rate RUB-USD',
  })
  @IsNumber()
  readonly RUB_USD?: number;

  @ApiProperty({
    description: 'Rate RUB-EUR',
  })
  @IsNumber()
  readonly RUB_EUR?: number;

  @ApiProperty({
    description: 'Rate USD-EUR',
  })
  @IsNumber()
  readonly USD_EUR?: number;
}
