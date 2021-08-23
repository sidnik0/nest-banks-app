import { BaseModel } from './base.model';
import { FaceType } from '../../types/face.type';

export interface UserModel extends BaseModel {
  name: string;
  face: FaceType;
}
