import { FaceType } from '../../types/face/face.type';

export interface UserInterface {
  id: string;
  name: string;
  face: FaceType;
}
