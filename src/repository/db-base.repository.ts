import { BaseRepository } from './interface/base.repository';
import { Repository } from 'typeorm';

export abstract class DbBaseRepository<T> implements BaseRepository<T> {
  protected repository: Repository<T>;

  async create(model: T): Promise<T> {
    return await this.repository.save(model);
  }

  async get(id: string): Promise<T> {
    if (!id) return null;

    return await this.repository.findOne(id);
  }

  async getAll(): Promise<Array<T>> {
    return await this.repository.find();
  }

  async update(model: T): Promise<T> {
    return await this.repository.save(model);
  }

  async deleteById(id: string): Promise<boolean> {
    const row = await this.repository.delete(id);

    return !!row;
  }
}
