import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserModel } from './interface/user.model';
import { FaceType } from '../types/face.type';

@Entity()
export class UserEntity implements UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: FaceType,
    default: FaceType.individual,
  })
  face: FaceType;
}
