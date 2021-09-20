import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class GetAllAccountsByQueryDto {
  @ApiPropertyOptional({
    description: 'User accounts',
  })
  @IsOptional()
  @IsUUID()
  readonly userId?: string;

  @ApiPropertyOptional({
    description: 'Bank accounts',
  })
  @IsOptional()
  @IsUUID()
  readonly bankId?: string;
}
