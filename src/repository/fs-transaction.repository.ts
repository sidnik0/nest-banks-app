import { Injectable } from '@nestjs/common';
import { FsBaseRepository } from './fs-base.repository';
import { TransactionRepository } from './interface/transaction.repository';
import { FsHelper } from '../common/helper/interface/fs.helper';
import { IdHelper } from '../common/helper/interface/id.helper';
import { TransactionModel } from '../model/interface/transaction.model';

@Injectable()
export class FsTransactionRepository
  extends FsBaseRepository<TransactionModel>
  implements TransactionRepository
{
  constructor(
    protected readonly fsHelper: FsHelper,
    protected readonly idHelper: IdHelper,
  ) {
    super();

    this.fileName = 'transactions';
    this.data = fsHelper.readFile<TransactionModel>(this.fileName);
  }

  async update(): Promise<never> {
    throw Error('Prohibited operation');
  }

  async deleteById(): Promise<never> {
    throw Error('Prohibited operation');
  }

  async getByAccount(
    id: string,
    period?: { from: number; to: number },
  ): Promise<Array<TransactionModel>> {
    const result: Array<TransactionModel> = [];

    for (const obj of Object.values(this.data)) {
      if (obj.fromAccountId === id || obj.toAccountId === id) {
        result.push(obj);
      }
    }

    return !period
      ? result
      : FsTransactionRepository.filterByPeriod(result, period);
  }

  private static filterByPeriod(
    data: Array<TransactionModel>,
    period: { from: number; to: number },
  ): Array<TransactionModel> {
    return data.map((transaction) => {
      if (
        period.from <= transaction.create &&
        transaction.create <= period.to
      ) {
        return transaction;
      }
    });
  }
}
