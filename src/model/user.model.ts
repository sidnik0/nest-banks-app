import { FaceType } from '../types/face.type';

export interface UserModel {
  id: string;
  name: string;
  face: FaceType;
}
