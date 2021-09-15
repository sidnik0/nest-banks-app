import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBankDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsNumber()
  readonly commissionForEntity?: number;

  @IsOptional()
  @IsNumber()
  readonly commissionForIndividual?: number;
}
