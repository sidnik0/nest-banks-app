import { Inject } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { IBaseRepository } from './interface/base.repository';
import { BaseEntity } from '../model/base.entity';
import { NotFountException } from '../common/exception/not-fount.exception';

export abstract class DbBaseRepository<T extends BaseEntity> implements IBaseRepository<T> {
  @Inject()
  private readonly connection: Connection;

  protected constructor(protected readonly repository: Repository<T>) {}

  abstract getLoggingModelId(model: T | string): string;

  async create(model: T): Promise<T> {
    return await this.repository.save(model as any);
  }

  async get(id: string): Promise<T> {
    const data = await this.repository.findOne(id);

    if (!data) {
      throw new NotFountException(`Data ${this.getLoggingModelId(id)} not found`);
    }

    return data;
  }

  async getAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async update(model: T): Promise<T> {
    return await this.repository.save(model as any);
  }

  async delete(id: string): Promise<boolean> {
    return await this.repository
      .delete(id)
      .then((data) => (typeof data.affected === 'number' ? !!data.affected : !!data.raw));
  }
}
