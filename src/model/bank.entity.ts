import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { BankModel } from './interface/bank.model';

@Entity()
export class BankEntity extends BaseEntity implements BankModel {
  @Column({
    type: 'smallint',
    nullable: false,
    default: 0,
  })
  commissionForEntity: number;

  @Column({
    type: 'smallint',
    nullable: false,
    default: 0,
  })
  commissionForIndividual: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;
}
