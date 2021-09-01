import { BaseRepository } from '../repository/interface/base.repository';
import { BaseModel } from '../model/interface/base.model';

export abstract class BaseService<T extends BaseModel> {
  protected constructor(protected readonly repository: BaseRepository<T>) {}

  async create(model: T): Promise<T> {
    return await this.repository.create(model);
  }

  async get(id: string): Promise<T> {
    return await this.repository.get(id);
  }

  async getAll(): Promise<T[]> {
    return await this.repository.getAll();
  }

  async update(model: T): Promise<T> {
    const data = await this.repository.get(model.id);

    return await this.repository.update({ ...data, ...model });
  }

  async delete(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }
}
