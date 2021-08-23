import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './interface/base.model';

@Entity()
export abstract class BaseEntity implements BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
