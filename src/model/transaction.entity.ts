import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TransactionModel } from './interface/transaction.model';
import { AccountEntity } from './account.entity';

@Entity()
export class TransactionEntity extends BaseEntity implements TransactionModel {
  @Column()
  amount: number;

  @Column()
  createAt: Date;

  @ManyToOne(() => AccountEntity)
  fromAccountId: string;

  @ManyToOne(() => AccountEntity)
  toAccountId: string;
}
