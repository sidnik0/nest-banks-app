import { Injectable, Logger } from '@nestjs/common';
import { FsBaseRepository } from './fs-base.repository';
import { IRateRepository } from './interface/rate.repository';
import { RateModel } from '../model/interface/rate.model';
import { FileSystemHelper } from '../common/helper/file-system';
import { IdGenerator } from '../common/helper/id-generator';
import { NotFountException } from '../common/exception/not-fount.exception';

@Injectable()
export class FsRateRepository extends FsBaseRepository<RateModel> implements IRateRepository {
  constructor(protected readonly fileSystem: FileSystemHelper, protected readonly idGenerator: IdGenerator) {
    super(fileSystem, idGenerator);

    this.logger = new Logger('FsRateRepository');
    this.fileName = 'rates';
    this.data = this.fileSystem.readFile<RateModel>(this.fileName);
  }

  getLoggingModelId(model: string | RateModel): string {
    if (typeof model === 'string') {
      return model;
    }

    return model.id ? `id=${model.id}` : `${model}`;
  }

  async create(model: RateModel): Promise<RateModel> {
    delete model.bank;

    return await super.create(model);
  }

  get(): never {
    throw Error('Prohibited operation');
  }

  async getByBank(id: string): Promise<RateModel> {
    let data = null;

    for (const obj of Object.values(this.data)) {
      if (obj.bankId === id) {
        data = { ...obj };

        break;
      }
    }

    if (!data) {
      throw new NotFountException(`Data ${this.getLoggingModelId(id)} not found`);
    }

    return data;
  }
}
