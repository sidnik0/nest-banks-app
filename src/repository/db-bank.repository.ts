import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DbBaseRepository } from './db-base.repository';
import { IBankRepository } from './interface/bank.repository';
import { BankEntity } from '../model/bank.entity';

@Injectable()
export class DbBankRepository extends DbBaseRepository<BankEntity> implements IBankRepository {
  constructor(
    @InjectRepository(BankEntity)
    protected readonly repository: Repository<BankEntity>,
  ) {
    super(repository);
  }

  getLoggingModelId(model: string | BankEntity): string {
    if (typeof model === 'string') {
      return model;
    }

    return model.id ? `id=${model.id}` : `name=${model.name}`;
  }

  async checkName(name: string): Promise<boolean> {
    const bank = await this.repository.find({ where: { name } });

    return !!bank.length;
  }
}
