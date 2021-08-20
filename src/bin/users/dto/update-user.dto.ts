import { FaceType } from '../../../types/face.type';

export class UpdateUserDto {
  readonly id?: string;
  readonly name?: string;
  readonly face?: FaceType;
}
