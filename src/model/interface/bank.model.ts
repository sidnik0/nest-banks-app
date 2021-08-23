import { BaseModel } from './base.model';

export interface BankModel extends BaseModel {
  name: string;
  commissionForEntities: number;
  commissionForIndividual: number;
}
