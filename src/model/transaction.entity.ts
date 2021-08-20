import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TransactionModel } from './interface/transaction.model';
import { AccountEntity } from './account.entity';

@Entity()
export class TransactionEntity implements TransactionModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: number;

  @Column()
  create: number;

  @ManyToOne(() => AccountEntity)
  fromAccountId: string;

  @ManyToOne(() => AccountEntity)
  toAccountId: string;
}
