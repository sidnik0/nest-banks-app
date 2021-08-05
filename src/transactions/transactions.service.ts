import { Injectable } from '@nestjs/common';
import { HelpersService } from '../common/helpers/helpers.service';
import { TransactionInterface } from './interfaces/transaction.interface';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  private transactions: Map<string, TransactionInterface> = new Map();

  constructor(private readonly helpersService: HelpersService) {}

  create(createTransactionDto: CreateTransactionDto): TransactionInterface {
    const id = this.helpersService.createId();

    const create = Date.now();

    this.transactions.set(id, {
      ...createTransactionDto,
      create,
      id,
    });

    return this.transactions.get(id);
  }

  getById(id: string): TransactionInterface | undefined {
    return this.transactions.get(id);
  }

  get(): Map<string, TransactionInterface> {
    return this.transactions;
  }
}
