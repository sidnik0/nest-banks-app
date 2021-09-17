import { Injectable, Logger } from '@nestjs/common';
import { FsBaseRepository } from './fs-base.repository';
import { IBankRepository } from './interface/bank.repository';
import { BankModel } from '../model/interface/bank.model';
import { FileSystemHelper } from 'src/common/helper/file-system';
import { IdGenerator } from 'src/common/helper/id-generator';

@Injectable()
export class FsBankRepository extends FsBaseRepository<BankModel> implements IBankRepository {
  constructor(protected readonly fileSystem: FileSystemHelper, protected readonly idGenerator: IdGenerator) {
    super(fileSystem, idGenerator);

    this.logger = new Logger('FsBankRepository');
    this.fileName = 'banks';
    this.data = this.fileSystem.readFile<BankModel>(this.fileName);
  }

  getLoggingModelId(model: string | BankModel): string {
    if (typeof model === 'string') {
      return model;
    }

    return model.id ? `id=${model.id}` : `name=${model.name}`;
  }

  async checkName(name: string): Promise<boolean> {
    let bank = null;

    for (const bankId of Object.keys(this.data)) {
      if (this.data[bankId].name === name) {
        bank = this.data[bankId];

        break;
      }
    }

    return !!bank;
  }
}
