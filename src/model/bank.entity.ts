import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BankModel } from './interface/bank.model';

@Entity()
export class BankEntity implements BankModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  comEnt: number;

  @Column()
  comInd: number;

  @Column()
  name: string;
}
