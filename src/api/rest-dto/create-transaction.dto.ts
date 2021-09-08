export class CreateTransactionDto {
  readonly fromAccountId: string;
  readonly toAccountId: string;
  readonly amount: number;
}
