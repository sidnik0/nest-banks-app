import { Logger } from '@nestjs/common';
import { IBaseRepository } from './interface/base.repository';
import { BaseModel } from '../model/interface/base.model';
import { FsHelper } from '../common/helper/interface/fs.helper';
import { IdHelper } from '../common/helper/interface/id.helper';

export abstract class FsBaseRepository<T extends BaseModel>
  implements IBaseRepository<T>
{
  protected logger: Logger;
  protected fileName: string;
  protected data: { [i: string]: T };

  protected constructor(
    protected readonly fsHelper: FsHelper,
    protected readonly idHelper: IdHelper,
  ) {}

  async create(model: T): Promise<T> {
    const id = this.idHelper.createId();

    this.data[id] = { id, ...model };

    const result = this.fsHelper.writeFile(this.fileName, this.data);

    if (result) return this.data[id];

    this.logger.error(`Data ${id} not created`);

    return null;
  }

  async get(id: string): Promise<T> {
    const data = this.data[id];

    if (data) return data;

    this.logger.error(`Data ${id} not found`);

    return null;
  }

  async getAll(): Promise<T[]> {
    return Object.values(this.data);
  }

  async update(model: T): Promise<T> {
    this.data[model.id] = model;

    const result = this.fsHelper.writeFile(this.fileName, this.data);

    if (result) return this.data[model.id];

    this.logger.error(`Data ${model.id} not updated`);

    return null;
  }

  async delete(id: string): Promise<boolean> {
    delete this.data[id];

    const result = this.fsHelper.writeFile(this.fileName, this.data);

    if (result) return true;

    this.logger.error(`Data ${id} not deleted`);

    return false;
  }
}
