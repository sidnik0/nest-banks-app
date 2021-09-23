import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
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

  update(): never {
    throw Error('Prohibited operation');
  }

  delete(): never {
    throw Error('Prohibited operation');
  }

  async getAllByAccount(id: string, period?: { from: Date; to: Date }): Promise<TransactionEntity[]> {
    if (!period) {
      return await this.repository.find({
        where: [{ toAccountId: id }, { fromAccountId: id }],
      });
    }
    const fromTime = period.from.toISOString();
    const toTime = period.to.toISOString();

    return await this.repository.find({
      where: [
        { toAccountId: id, createAt: Between(fromTime, toTime) },
        { fromAccountId: id, createAt: Between(fromTime, toTime) },
      ],
    });
  }
}
