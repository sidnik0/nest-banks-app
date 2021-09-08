import { IdDto } from "./base/id.dto";
import { OperationType } from "src/types/operation.type";

export class UpdateAccountDto extends IdDto {
  readonly amount: number;
  readonly operation: OperationType;
}