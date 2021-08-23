import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserModel } from './interface/user.model';
import { FaceType } from '../types/face.type';

@Entity()
export class UserEntity extends BaseEntity implements UserModel {
  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: FaceType,
    default: FaceType.INDIVIDUAL,
  })
  face: FaceType;
}
