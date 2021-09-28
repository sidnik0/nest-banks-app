import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DbBaseRepository } from './db-base.repository';
import { IAccountRepository } from './interface/account.repository';
import { AccountEntity } from '../model/account.entity';

@Injectable()
export class DbAccountRepository extends DbBaseRepository<AccountEntity> implements IAccountRepository {
  constructor(
    @InjectRepository(AccountEntity)
    protected readonly repository: Repository<AccountEntity>,
  ) {
    super(repository);
  }

  getLoggingModelId(model: string | AccountEntity): string {
    if (typeof model === 'string') {
      return model;
    }

    return model.id ? `id=${model.id}` : `userId=${model.userId}, bankId=${model.bankId}`;
  }

  async create(model: AccountEntity): Promise<AccountEntity> {
    delete model.bankId;
    delete model.userId;

    return await super.create(model);
  }

  async update(model: AccountEntity): Promise<AccountEntity> {
    return await super.update(model);
  }

  getAllByUser(id: string): Promise<AccountEntity[]> {
    return this.repository.find({ userId: id });
  }

  getAllByBank(id: string): Promise<AccountEntity[]> {
    return this.repository.find({ bankId: id });
  }

  getAllByUserAndBank(userId: string, bankId: string): Promise<AccountEntity[]> {
    return this.repository.find({ userId, bankId });
  }
}
