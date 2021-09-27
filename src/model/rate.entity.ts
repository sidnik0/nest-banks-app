import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BankEntity } from './bank.entity';
import { BaseEntity } from './base.entity';
import { RateModel } from './interface/rate.model';

@Entity()
export class RateEntity extends BaseEntity implements RateModel {
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

  @Column({
    type: 'uuid',
    nullable: false,
  })
  bankId: string;

  @OneToOne(() => BankEntity, { nullable: false })
  @JoinColumn()
  bank: BankEntity;
}
