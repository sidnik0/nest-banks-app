import { BaseModel } from './base.model';

export interface RateModel extends BaseModel {
  RUB_USD: number;
  RUB_EUR: number;
  USD_EUR: number;
}
