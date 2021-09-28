import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BankEntity } from './bank.entity';
import { BaseEntity } from './base.entity';
import { RateModel } from './interface/rate.model';

@Entity()
export class RateEntity extends BaseEntity implements RateModel {
  @Column({
    type: 'float',
    default: 1,
    nullable: false,
    scale: 2,
  })
  rubUsd: number;

  @Column({
    type: 'float',
    default: 1,
    nullable: false,
    scale: 2,
  })
  rubEur: number;

  @Column({
    type: 'float',
    default: 1,
    nullable: false,
    scale: 2,
  })
  usdEur: number;

  @Column({
    type: 'uuid',
    nullable: false,
  })
  bankId: string;

  @OneToOne(() => BankEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  bank: BankEntity;
}
