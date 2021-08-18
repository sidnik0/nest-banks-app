import { BaseRepository } from './interface/base.repository';
import { FsHelperService } from '../common/helper/fs-helper.service';

export abstract class FsBaseRepository<T extends { id: string }>
  implements BaseRepository<T>
{
  protected data: { [index: string]: T };
  protected fileName: string;

  protected constructor(protected readonly fsHelperService: FsHelperService) {}

  async create(model: T): Promise<T> {
    this.data[model.id] = model;

    const result = this.fsHelperService.writeFile(this.fileName, this.data);

    if (!result) throw Error('Data not created');

    return this.data[model.id];
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

  async update(model: T): Promise<T> {
    this.data[model.id] = model;

    const result = this.fsHelperService.writeFile(this.fileName, this.data);

    if (!result) throw Error('Data not updated');

    return this.data[model.id];
  }

  async deleteById(id: string): Promise<boolean> {
    this.data[id] = undefined;

    const result = this.fsHelperService.writeFile(this.fileName, this.data);

    if (!result) throw Error('Data not delete');

    return true;
  }
}
