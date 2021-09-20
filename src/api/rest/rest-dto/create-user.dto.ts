import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { FaceType } from '../../../types/face.type';

export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    enum: FaceType,
    description: 'User face',
  })
  @IsEnum(FaceType)
  readonly face: FaceType;
}
