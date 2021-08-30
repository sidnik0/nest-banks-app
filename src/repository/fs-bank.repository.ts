import { Injectable, Logger } from '@nestjs/common';
import { FsBaseRepository } from './fs-base.repository';
import { BankRepository } from './interface/bank.repository';
import { BankModel } from '../model/interface/bank.model';
import { FileSystem } from '../common/helper/file-system';
import { IdGenerator } from '../common/helper/id-generator';

@Injectable()
export class FsBankRepository
  extends FsBaseRepository<BankModel>
  implements BankRepository
{
  constructor(
    protected readonly fileSystem: FileSystem,
    protected readonly idGenerator: IdGenerator,
  ) {
    super(fileSystem, idGenerator);

    this.logger = new Logger('FsBankRepository');
    this.fileName = 'banks';
    this.data = this.fileSystem.readFile<BankModel>(this.fileName);
  }

  getLoggingModelId(model: string | BankModel): string {
    if (typeof model === 'string') return model;

    return model.id ? `id=${model.id}` : `name=${model.name}`;
  }
}
