import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DbBaseRepository } from './db-base.repository';
import { ITransactionRepository } from './interface/transaction.repository';
import { TransactionEntity } from '../model/transaction.entity';

@Injectable()
export class DbTransactionRepository
  extends DbBaseRepository<TransactionEntity>
  implements ITransactionRepository
{
  constructor(
    @InjectRepository(TransactionEntity)
    protected readonly repository: Repository<TransactionEntity>,
  ) {
    super(repository);
  }

  async update(): Promise<never> {
    throw Error('Prohibited operation');
  }

  async delete(): Promise<never> {
    throw Error('Prohibited operation');
  }

  async getAllByAccount(
    id: string,
    period?: { from: Date; to: Date },
  ): Promise<TransactionEntity[]> {
    return await this.repository.find({
      where: [{ toAccountId: id }, { fromAccountId: id }],
    });

    // return !period
    //   ? data
    //   : DbTransactionRepository.filterByPeriod(data, period);
  }

  // private static filterByPeriod(
  //   data: Array<TransactionEntity>,
  //   period: { from: Date; to: Date },
  // ): Array<TransactionEntity> {
  //   return data.map((transaction) => {
  //     if (
  //       period.from <= transaction.createAt &&
  //       transaction.createAt <= period.to
  //     ) {
  //       return transaction;
  //     }
  //   });
  // }
}
