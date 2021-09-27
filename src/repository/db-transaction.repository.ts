import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { DbBaseRepository } from './db-base.repository';
import { ITransactionRepository } from './interface/transaction.repository';
import { TransactionEntity } from '../model/transaction.entity';

@Injectable()
export class DbTransactionRepository extends DbBaseRepository<TransactionEntity> implements ITransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    protected readonly repository: Repository<TransactionEntity>,
  ) {
    super(repository);
  }

  getLoggingModelId(model: string | TransactionEntity): string {
    if (typeof model === 'string') {
      return model;
    }

    return model.id
      ? `id=${model.id}`
      : `fromAccountId=${model.fromAccountId}, toAccountId=${model.toAccountId}, createAt=${model.createAt}`;
  }

  async create(model: TransactionEntity): Promise<TransactionEntity> {
    delete model.fromAccountId;
    delete model.toAccountId;

    return await super.create(model);
  }

  update(): never {
    throw Error('Prohibited operation');
  }

  delete(): never {
    throw Error('Prohibited operation');
  }

  async getAllByAccount(id: string, period?: { from: Date; to: Date }): Promise<TransactionEntity[]> {
    const whereOptions = !period
      ? [{ toAccountId: id }, { fromAccountId: id }]
      : [
          { toAccountId: id, createAt: Between(period.from.toISOString(), period.to.toISOString()) },
          { fromAccountId: id, createAt: Between(period.from.toISOString(), period.to.toISOString()) },
        ];

    return await this.repository.find({ where: whereOptions });
  }
}
