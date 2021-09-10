import { IdDto } from './base/id.dto';

export class UpdateBankDto extends IdDto {
  readonly name?: string;
  readonly commissionForEntity?: number;
  readonly commissionForIndividual?: number;
}
