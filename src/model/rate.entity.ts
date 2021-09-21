import { Entity, Column, OneToOne } from 'typeorm';
import { BankEntity } from './bank.entity';
import { BaseEntity } from './base.entity';
import { RateModel } from './interface/rate.model';

@Entity()
export class RateEntity extends BaseEntity implements RateModel {
  @OneToOne(() => BankEntity, {
    nullable: false,
    orphanedRowAction: 'delete',
  })
  bankId: string;

  @Column({
    type: 'float',
    default: 0,
    nullable: false,
    scale: 2,
  })
  RUB_USD: number;

  @Column({
    type: 'float',
    default: 0,
    nullable: false,
    scale: 2,
  })
  RUB_EUR: number;

  @Column({
    type: 'float',
    default: 0,
    nullable: false,
    scale: 2,
  })
  USD_EUR: number;
}
