import { Logger } from '@nestjs/common';
import { IBaseRepository } from './interface/base.repository';
import { BaseModel } from '../model/interface/base.model';
import { IFsHelper } from '../common/helper/interface/fs-helper';
import { IIdHelper } from '../common/helper/interface/id-helper';
import { NotFountException } from '../common/exseption/not-fount-exception';

export abstract class FsBaseRepository<T extends BaseModel>
  implements IBaseRepository<T>
{
  protected logger: Logger;
  protected fileName: string;
  protected data: { [i: string]: T };

  protected constructor(
    protected readonly fsHelper: IFsHelper,
    protected readonly idHelper: IIdHelper,
  ) {}

  abstract getLoggingModelId(model: T | string): string;

  async create(model: T): Promise<T> {
    const id = this.idHelper.createId();

    this.data[id] = { id, ...model };

    try {
      this.fsHelper.writeFile(this.fileName, this.data);

      return this.data[id];
    } catch (e) {
      this.logger.error(
        `Data ${this.getLoggingModelId(model)} not created`,
        e.stack,
      );

      throw e;
    }
  }

  async get(id: string): Promise<T> {
    const data = this.data[id];

    if (!data) {
      this.logger.error(`Data ${this.getLoggingModelId(id)} not found`);

      throw new NotFountException(
        `Data ${this.getLoggingModelId(id)} not found`,
      );
    }

    return data;
  }

  async getAll(): Promise<T[]> {
    return Object.values(this.data);
  }

  async update(model: T): Promise<T> {
    this.data[model.id] = model;

    try {
      this.fsHelper.writeFile(this.fileName, this.data);

      return this.data[model.id];
    } catch (e) {
      this.logger.error(
        `Data ${this.getLoggingModelId(model)} not updated`,
        e.stack,
      );

      throw e;
    }
  }

  async delete(id: string): Promise<boolean> {
    delete this.data[id];

    try {
      this.fsHelper.writeFile(this.fileName, this.data);

      return true;
    } catch (e) {
      this.logger.error(
        `Data ${this.getLoggingModelId(id)} not deleted`,
        e.stack,
      );

      throw e;
    }
  }
}
