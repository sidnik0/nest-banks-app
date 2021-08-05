import { Injectable } from '@nestjs/common';
import { TransactionInterface } from './interfaces/transaction.interface';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  private transactions: Map<string, TransactionInterface> = new Map();

  create(createTransactionDto: CreateTransactionDto): TransactionInterface {
    const create = Date.now();
    this.transactions.set(createTransactionDto.id, {
      ...createTransactionDto,
      create,
    });

    return this.transactions.get(createTransactionDto.id);
  }

  getById(id: string): TransactionInterface {
    return this.transactions.get(id);
  }

  get(): Map<string, TransactionInterface> {
    return this.transactions;
  }
}
