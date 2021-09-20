import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { RateModel } from './interface/rate.model';

@Entity()
export class RateEntity extends BaseEntity implements RateModel {
  @Column('number', { default: 1 })
  RUB_USD: number;

  @Column('number', { default: 1 })
  RUB_EUR: number;

  @Column('number', { default: 1 })
  USD_EUR: number;
}
