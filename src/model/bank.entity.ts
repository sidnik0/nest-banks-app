import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { BankModel } from './interface/bank.model';

@Entity()
export class BankEntity extends BaseEntity implements BankModel {
  @Column()
  commissionForEntities: number;

  @Column()
  commissionForIndividual: number;

  @Column()
  name: string;
}
