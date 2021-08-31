import { BaseModel } from './base.model';

export interface BankModel extends BaseModel {
  name: string;
  commissionForEntity: number;
  commissionForIndividual: number;
}
