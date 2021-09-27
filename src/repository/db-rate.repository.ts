import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DbBaseRepository } from './db-base.repository';
import { IRateRepository } from './interface/rate.repository';
import { RateEntity } from '../model/rate.entity';
import { NotFountException } from '../common/exception/not-fount.exception';

@Injectable()
export class DbRateRepository extends DbBaseRepository<RateEntity> implements IRateRepository {
  constructor(
    @InjectRepository(RateEntity)
    protected readonly repository: Repository<RateEntity>,
  ) {
    super(repository);
  }

  getLoggingModelId(model: string | RateEntity): string {
    if (typeof model === 'string') {
      return model;
    }

    return model.id ? `id=${model.id}` : `${model}`;
  }

  async create(model: RateEntity): Promise<RateEntity> {
    delete model.bankId;

    return await super.create(model);
  }

  async get(): Promise<never> {
    throw Error('Prohibited operation');
  }

  async getByBank(id: string): Promise<RateEntity> {
    const data = await this.repository.findOne({ where: { bankId: id } });

    if (!data) {
      throw new NotFountException(`Data ${this.getLoggingModelId(id)} not found`);
    }

    return data;
  }
}
