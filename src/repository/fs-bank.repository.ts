import { Injectable, Logger } from '@nestjs/common';
import { FsBaseRepository } from './fs-base.repository';
import { IBankRepository } from './interface/bank.repository';
import { BankModel } from '../model/interface/bank.model';

@Injectable()
export class FsBankRepository extends FsBaseRepository<BankModel> implements IBankRepository {
  constructor() {
    super();

    this.logger = new Logger('FsBankRepository');
    this.fileName = 'banks';
    this.data = this.fileSystem.readFile<BankModel>(this.fileName);
  }

  getLoggingModelId(model: string | BankModel): string {
    if (typeof model === 'string') return model;

    return model.id ? `id=${model.id}` : `name=${model.name}`;
  }
}
