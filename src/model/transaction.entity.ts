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

  @Column({
    type: 'uuid',
    nullable: true,
  })
  fromAccountId: string;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  toAccountId: string;

  @ManyToOne(() => AccountEntity, { nullable: true, orphanedRowAction: 'nullify', onDelete: 'SET NULL' })
  fromAccount: AccountEntity;

  @ManyToOne(() => AccountEntity, { nullable: true, orphanedRowAction: 'nullify', onDelete: 'SET NULL' })
  toAccount: AccountEntity;
}
