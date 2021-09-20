import { Injectable, Logger } from '@nestjs/common';
import { FsBaseRepository } from './fs-base.repository';
import { IRateRepository } from './interface/rate.repository';
import { RateModel } from '../model/interface/rate.model';
import { FileSystemHelper } from '../common/helper/file-system';
import { IdGenerator } from '../common/helper/id-generator';

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
}
