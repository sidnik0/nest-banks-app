import { IsNumber, IsString } from 'class-validator';

export class CreateBankDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly commissionForEntity: number;

  @IsNumber()
  readonly commissionForIndividual: number;
}
