import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AccountModel } from './account.model';
import { CurrencyType } from '../types/currency.type';
import { UserBankEntity } from './user-bank.entity';

@Entity()
export class AccountEntity implements AccountModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  balance: number;

  @Column({
    type: 'enum',
    enum: CurrencyType,
    default: CurrencyType.RUB,
  })
  currency: CurrencyType;

  @ManyToOne(() => UserBankEntity)
  userBankId: string;
}
