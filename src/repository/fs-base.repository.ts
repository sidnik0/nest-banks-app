import { BaseRepository } from './interface/base.repository';
import { FsHelper } from '../common/helper/interface/fs.helper';
import { IdHelper } from '../common/helper/interface/id.helper';

export abstract class FsBaseRepository<T extends { id?: string }>
  implements BaseRepository<T>
{
  protected readonly fsHelper: FsHelper;
  protected readonly idHelper: IdHelper;
  protected data: { [i: string]: T };
  protected fileName: string;

  async create(model: T): Promise<T> {
    const id = this.idHelper.createId();

    this.data[id] = { id, ...model };

    const result = this.fsHelper.writeFile(this.fileName, this.data);

    if (!result) throw Error('Data not created');

    return this.data[id];
  }

  async get(id: string): Promise<T> {
    return this.data[id];
  }

  async getAll(): Promise<Array<T>> {
    const result: Array<T> = [];

    for (const obj of Object.values(this.data)) {
      result.push(obj);
    }

    return result;
  }

  async update(model: T): Promise<T> | null {
    if (!model.id) return null;

    this.data[model.id] = model;

    const result = this.fsHelper.writeFile(this.fileName, this.data);

    if (!result) throw Error('Data not updated');

    return this.data[model.id];
  }

  async deleteById(id: string): Promise<boolean> {
    if (!id) return false;

    this.data[id] = undefined;

    const result = this.fsHelper.writeFile(this.fileName, this.data);

    if (!result) throw Error('Data not delete');

    return true;
  }
}
