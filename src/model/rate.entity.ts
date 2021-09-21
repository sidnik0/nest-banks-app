import { Entity, Column, OneToOne } from 'typeorm';
import { BankEntity } from './bank.entity';
import { BaseEntity } from './base.entity';
import { RateModel } from './interface/rate.model';

@Entity()
export class RateEntity extends BaseEntity implements RateModel {
  @OneToOne(() => BankEntity)
  bankId: string;

  @Column()
  RUB_USD: number;

  @Column()
  RUB_EUR: number;

  @Column()
  USD_EUR: number;
}
