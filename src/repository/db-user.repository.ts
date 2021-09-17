import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DbBaseRepository } from './db-base.repository';
import { IUserRepository } from './interface/user.repository';
import { UserEntity } from '../model/user.entity';

@Injectable()
export class DbUserRepository extends DbBaseRepository<UserEntity> implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    protected readonly repository: Repository<UserEntity>,
  ) {
    super(repository);
  }

  getLoggingModelId(model: string | UserEntity): string {
    if (typeof model === 'string') {
      return model;
    }

    return model.id ? `id=${model.id}` : `name=${model.name}`;
  }

  async checkName(name: string): Promise<boolean> {
    const user = await this.repository.find({ where: { name } });

    return !!user.length;
  }
}
