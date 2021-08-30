import { BaseRepository } from './interface/base.repository';
import { Repository } from 'typeorm';
import { BaseEntity } from '../model/base.entity';

export abstract class DbBaseRepository<T extends BaseEntity>
  implements BaseRepository<T>
{
  protected constructor(protected readonly repository: Repository<T>) {}

  async create(model: T): Promise<T> {
    return await this.repository.save(model as any);
  }

  async get(id: string): Promise<T> {
    return await this.repository.findOne(id);
  }

  async getAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async update(model: T): Promise<T> {
    return await this.repository.save(model as any);
  }

  async delete(id: string): Promise<boolean> {
    return await this.repository.delete(id).then((data) => !!data.affected);
  }
}
