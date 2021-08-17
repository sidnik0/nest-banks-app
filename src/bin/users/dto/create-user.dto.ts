import { FaceType } from '../../../types/face/face.type';

export class CreateUserDto {
  readonly name: string;
  readonly face: FaceType;
}
