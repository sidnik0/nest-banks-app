import { IBaseRepository } from './interface/base.repository';
import { Repository } from 'typeorm';

export abstract class DbBaseRepository<T> implements IBaseRepository<T> {
  protected constructor(protected readonly repository: Repository<T>) {}

  async create(model: T): Promise<T> {
    return await this.repository.save(model);
  }

  async get(id: string): Promise<T> {
    return await this.repository.findOne(id);
  }

  async getAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async update(model: T): Promise<T> {
    return await this.repository.save(model);
  }

  async delete(id: string): Promise<boolean> {
    const data = await this.repository.delete(id);

    return !!data.affected;
  }
}
