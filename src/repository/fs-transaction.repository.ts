import { Injectable, Logger } from '@nestjs/common';
import { FsBaseRepository } from './fs-base.repository';
import { ITransactionRepository } from './interface/transaction.repository';
import { IFsHelper } from '../common/helper/interface/fs-helper';
import { IIdHelper } from '../common/helper/interface/id-helper';
import { TransactionModel } from '../model/interface/transaction.model';

@Injectable()
export class FsTransactionRepository
  extends FsBaseRepository<TransactionModel>
  implements ITransactionRepository
{
  constructor(
    protected readonly fsHelper: IFsHelper,
    protected readonly idHelper: IIdHelper,
  ) {
    super(fsHelper, idHelper);

    this.logger = new Logger('FsTransactionRepository');
    this.fileName = 'transactions';
    this.data = fsHelper.readFile<TransactionModel>(this.fileName);
  }

  getLoggingModelId(model: string | TransactionModel): string {
    if (typeof model === 'string') return model;

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

  async getAllByAccount(
    id: string,
    period?: { from: Date; to: Date },
  ): Promise<TransactionModel[]> {
    const result: TransactionModel[] = [];

    for (const obj of Object.values(this.data)) {
      if (obj.fromAccountId === id || obj.toAccountId === id) {
        result.push(obj);
      }
    }

    return result;
  }
}
