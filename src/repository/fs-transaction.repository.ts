import { Injectable, Logger } from '@nestjs/common';
import { FsBaseRepository } from './fs-base.repository';
import { ITransactionRepository } from './interface/transaction.repository';
import { TransactionModel } from '../model/interface/transaction.model';
import { FileSystemHelper } from '../common/helper/file-system';
import { IdGenerator } from '../common/helper/id-generator';

@Injectable()
export class FsTransactionRepository extends FsBaseRepository<TransactionModel> implements ITransactionRepository {
  constructor(protected readonly fileSystem: FileSystemHelper, protected readonly idGenerator: IdGenerator) {
    super(fileSystem, idGenerator);

    this.logger = new Logger('FsTransactionRepository');
    this.fileName = 'transactions';
    this.data = this.fileSystem.readFile<TransactionModel>(this.fileName);
  }

  getLoggingModelId(model: string | TransactionModel): string {
    if (typeof model === 'string') {
      return model;
    }

    return model.id
      ? `id=${model.id}`
      : `fromAccountId=${model.fromAccountId}, toAccountId=${model.toAccountId}, createAt=${model.createAt}`;
  }

  async update(): Promise<never> {
    throw Error('Prohibited operation');
  }

  async delete(): Promise<never> {
    throw Error('Prohibited operation');
  }

  async getAllByAccount(id: string, period?: { from: Date; to: Date }): Promise<TransactionModel[]> {
    const result: TransactionModel[] = [];

    for (const obj of Object.values(this.data)) {
      if (obj.fromAccountId === id || obj.toAccountId === id) {
        result.push(obj);
      }
    }

    return result;
  }
}
