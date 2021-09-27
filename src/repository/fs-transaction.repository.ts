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

  update(): never {
    throw Error('Prohibited operation');
  }

  delete(): never {
    throw Error('Prohibited operation');
  }

  async getAllByAccount(id: string, period?: { from: Date; to: Date }): Promise<TransactionModel[]> {
    const periodExest = !!period;

    const data: TransactionModel[] = [];

    for (const model of Object.values(this.data)) {
      if (model.fromAccountId === id || model.toAccountId === id) {
        if (!periodExest) {
          data.push(model);

          continue;
        }

        const createTime = new Date(model.createAt).getTime();
        const fromTime = period.from.getTime();
        const toTime = period.to.getTime();

        if (fromTime <= createTime && createTime <= toTime) {
          data.push(model);
        }
      }
    }

    return data;
  }
}
