import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'User name',
  })
  @IsOptional()
  @IsString()
  readonly name?: string;
}
