import { IsOptional, IsUUID } from 'class-validator';

export class GetAllAccountsByQueryDto {
  @IsOptional()
  @IsUUID()
  readonly userId?: string;

  @IsOptional()
  @IsUUID()
  readonly bankId?: string;
}
