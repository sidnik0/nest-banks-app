export abstract class BaseRepository<T> {
  abstract create(model: T): Promise<T>;
  abstract get(id: string): Promise<T>;
  abstract getAll(): Promise<Array<T>>;
  abstract update(model: T): Promise<T>;
  abstract deleteById(id: string): Promise<boolean>;
}
