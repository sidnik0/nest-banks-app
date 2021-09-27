import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { AccountModel } from './interface/account.model';
import { CurrencyType } from '../types/currency.type';
import { UserEntity } from './user.entity';
import { BankEntity } from './bank.entity';

@Entity()
export class AccountEntity extends BaseEntity implements AccountModel {
  @Column({
    type: 'float',
    default: 0,
    nullable: false,
    scale: 2,
  })
  balance: number;

  @Column({
    type: 'enum',
    enum: CurrencyType,
    nullable: false,
    update: false,
  })
  currency: CurrencyType;

  @Column({
    type: 'uuid',
    nullable: false,
  })
  userId: string;

  @Column({
    type: 'uuid',
    nullable: false,
  })
  bankId: string;

  @ManyToOne(() => UserEntity, { nullable: false })
  user: UserEntity;

  @ManyToOne(() => BankEntity, { nullable: false })
  bank: BankEntity;
}
