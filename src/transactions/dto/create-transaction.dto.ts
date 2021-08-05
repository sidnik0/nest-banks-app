export class CreateTransactionDto {
  id: string;
  fromAccountId: string;
  toAccountId: string;
  value: number;
}
