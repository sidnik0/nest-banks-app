import { BaseModel } from '../../model/interface/base.model';

export abstract class BaseRepository<T extends BaseModel> {
  abstract create(model: T): Promise<T>;
  abstract get(id: string): Promise<T>;
  abstract getAll(): Promise<T[]>;
  abstract update(model: T): Promise<T>;
  abstract delete(id: string): Promise<boolean>;
}
