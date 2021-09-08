import { FaceType } from "src/types/face.type";

export class CreateUserDto {
  readonly name: string;
  readonly face: FaceType;
}
