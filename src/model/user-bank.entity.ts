import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserBankModel } from './interface/user-bank.model';
import { UserEntity } from './user.entity';
import { BankEntity } from './bank.entity';

@Entity()
export class UserBankEntity implements UserBankModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity)
  userId: string;

  @ManyToOne(() => BankEntity)
  bankId: string;
}
