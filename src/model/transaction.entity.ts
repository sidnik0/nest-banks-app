import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TransactionModel } from './interface/transaction.model';
import { AccountEntity } from './account.entity';

@Entity()
export class TransactionEntity extends BaseEntity implements TransactionModel {
  @Column({
    type: 'float',
    default: 0,
    nullable: false,
    scale: 2,
    update: false,
  })
  amount: number;

  @Column({
    type: 'timestamp',
    nullable: false,
    update: false,
  })
  createAt: Date;

  @ManyToOne(() => AccountEntity, { nullable: false })
  fromAccountId: string;

  @ManyToOne(() => AccountEntity, { nullable: false })
  toAccountId: string;
}
