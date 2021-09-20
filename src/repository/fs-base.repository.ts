import { Logger } from '@nestjs/common';
import { IBaseRepository } from './interface/base.repository';
import { BaseModel } from '../model/interface/base.model';
import { FileSystemHelper } from '../common/helper/file-system';
import { IdGenerator } from '../common/helper/id-generator';
import { NotFountException } from '../common/exception/not-fount.exception';

export abstract class FsBaseRepository<T extends BaseModel> implements IBaseRepository<T> {
  protected logger: Logger;
  protected fileName: string;
  protected data: Record<string, T>;

  protected constructor(protected readonly fileSystem: FileSystemHelper, protected readonly idGenerator: IdGenerator) {}

  abstract getLoggingModelId(model: T | string): string;

  async create(model: T): Promise<T> {
    const id = this.idGenerator.createId();

    this.data[id] = { id, ...model };

    try {
      this.fileSystem.writeFile(this.fileName, this.data);

      return this.data[id];
    } catch (e) {
      this.logger.error(`${this.fileName} ${this.getLoggingModelId(model)} not created`, e.stack);

      throw e;
    }
  }

  async get(id: string): Promise<T> {
    const data = this.data[id];

    if (!data) {
      this.logger.error(`${this.fileName} ${this.getLoggingModelId(id)} not found`);

      throw new NotFountException(`${this.fileName} ${this.getLoggingModelId(id)} not found`);
    }

    return data;
  }

  async getAll(): Promise<T[]> {
    return Object.values(this.data);
  }

  async update(model: T): Promise<T> {
    this.data[model.id] = model;

    try {
      this.fileSystem.writeFile(this.fileName, this.data);

      return this.data[model.id];
    } catch (e) {
      this.logger.error(`${this.fileName} ${this.getLoggingModelId(model)} not updated`, e.stack);

      throw e;
    }
  }

  async delete(id: string): Promise<boolean> {
    delete this.data[id];

    try {
      this.fileSystem.writeFile(this.fileName, this.data);

      return true;
    } catch (e) {
      this.logger.error(`${this.fileName} ${this.getLoggingModelId(id)} not deleted`, e.stack);

      throw e;
    }
  }
}
