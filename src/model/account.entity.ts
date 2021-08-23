import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { AccountModel } from './interface/account.model';
import { CurrencyType } from '../types/currency.type';
import { UserEntity } from './user.entity';
import { BankEntity } from './bank.entity';

@Entity()
export class AccountEntity extends BaseEntity implements AccountModel {
  @Column()
  balance: number;

  @Column({
    type: 'enum',
    enum: CurrencyType,
    default: CurrencyType.RUB,
  })
  currency: CurrencyType;

  @ManyToOne(() => UserEntity)
  userId: string;

  @ManyToOne(() => BankEntity)
  bankId: string;
}
