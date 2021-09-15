import { IsEnum, IsString } from 'class-validator';
import { FaceType } from '../../../types/face.type';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsEnum(FaceType)
  readonly face: FaceType;
}
