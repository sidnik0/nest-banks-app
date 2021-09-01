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
  }
}