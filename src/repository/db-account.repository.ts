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
    const data = Object.assign(new AccountEntity(), model);

    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(data);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return await this.repository.findOne(model);
  }

  async getAllByUser(id: string): Promise<AccountEntity[]> {
    return await this.repository.find({ userId: id });
  }

  async getAllByBank(id: string): Promise<AccountEntity[]> {
    return await this.repository.find({ bankId: id });
  }

  async getAllByUserAndBank(userId: string, bankId: string): Promise<AccountEntity[]> {
    return await this.repository.find({ userId, bankId });
  }
}
