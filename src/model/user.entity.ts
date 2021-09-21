import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserModel } from './interface/user.model';
import { FaceType } from '../types/face.type';

@Entity()
export class UserEntity extends BaseEntity implements UserModel {
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'enum',
    enum: FaceType,
    nullable: false,
    update: false,
  })
  face: FaceType;
}
