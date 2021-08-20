import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DbBaseRepository } from './db-base.repository';
import { TransactionRepository } from './interface/transaction.repository';
import { TransactionEntity } from '../model/transaction.entity';

@Injectable()
export class DbTransactionRepository
  extends DbBaseRepository<TransactionEntity>
  implements TransactionRepository
{
  constructor(
    @InjectRepository(TransactionEntity)
    protected readonly repository: Repository<TransactionEntity>,
  ) {
    super();
  }

  async update(): Promise<never> {
    throw Error('Prohibited operation');
  }

  async deleteById(): Promise<never> {
    throw Error('Prohibited operation');
  }

  async getByAccount(
    id: string,
    period?: { from: number; to: number },
  ): Promise<Array<TransactionEntity>> {
    const data = await this.repository.find({
      where: [{ toAccountId: id }, { fromAccountId: id }],
    });

    return !period
      ? data
      : DbTransactionRepository.filterByPeriod(data, period);
  }

  private static filterByPeriod(
    data: Array<TransactionEntity>,
    period: { from: number; to: number },
  ): Array<TransactionEntity> {
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
