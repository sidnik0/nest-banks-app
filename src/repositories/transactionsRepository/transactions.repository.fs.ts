import { Injectable } from '@nestjs/common';
import { HelpersService } from '../../common/helpers/helpers.service';
import { TransactionsRepository } from './transactions.repository';
import { TransactionsModelFs } from '../../models/transactionsModel/transactions.model.fs';

@Injectable()
export class TransactionsRepositoryFs implements TransactionsRepository {
  private transactions: Map<string, TransactionsModelFs> = new Map();

  constructor(private readonly helpersService: HelpersService) {}

  async create(data: TransactionsModelFs): Promise<TransactionsModelFs> {
    const id = this.helpersService.createId();

    this.transactions.set(id, { ...data, id });

    return this.transactions.get(id);
  }

  async getById(id: string): Promise<TransactionsModelFs> {
    return this.transactions.get(id);
  }

  async getByIdAccount(
    id: string,
    period?: { from: number; to: number },
  ): Promise<Array<TransactionsModelFs>> {
    const result: Array<TransactionsModelFs> = [];

    for (const obj of this.transactions.values()) {
      if (obj.fromAccountId === id || obj.toAccountId === id) {
        result.push(obj);
      }
    }
    if (!period) return result;

    return TransactionsRepositoryFs.filterByPeriod(result, period);
  }

  async get(): Promise<Array<TransactionsModelFs>> {
    const result: Array<TransactionsModelFs> = [];

    for (const obj of this.transactions.values()) {
      result.push(obj);
    }

    return result;
  }

  private static filterByPeriod(
    data: Array<TransactionsModelFs>,
    period: { from: number; to: number },
  ): Array<TransactionsModelFs> {
    return data.map((transaction) => {
      if (
        period.from <= transaction.create &&
        transaction.create <= period.to
      ) {
        return transaction;
      }
    });
  }
}
