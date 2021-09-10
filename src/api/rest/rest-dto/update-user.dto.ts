import { IdDto } from './base/id.dto';

export class UpdateUserDto extends IdDto {
  readonly name?: string;
}
