export abstract class IBaseService<T> {
  abstract create(model: T): Promise<T>;
  abstract get(id: string): Promise<T>;
  abstract getAll(): Promise<T[]>;
  abstract update(model: T): Promise<T>;
  abstract delete(id: string): Promise<boolean>;
}
