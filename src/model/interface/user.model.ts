import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from './base.model';
import { FaceType } from '../../types/face.type';

export class UserModel extends BaseModel {
  @ApiProperty()
  name: string;

  @ApiProperty()
  face: FaceType;
}
