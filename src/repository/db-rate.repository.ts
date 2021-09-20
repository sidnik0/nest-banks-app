import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DbBaseRepository } from './db-base.repository';
import { IRateRepository } from './interface/rate.repository';
import { RateEntity } from '../model/rate.entity';

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
}
