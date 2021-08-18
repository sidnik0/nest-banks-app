import { Injectable } from '@nestjs/common';
import { FsBaseRepository } from './fs-base.repository';
import { TransactionRepository } from './interface/transaction.repository';
import { FsHelperService } from '../common/helper/fs-helper.service';
import { TransactionModel } from '../model/transaction.model';

@Injectable()
export class FsTransactionRepository
  extends FsBaseRepository<TransactionModel>
  implements TransactionRepository
{
  constructor(protected readonly fsHelperService: FsHelperService) {
    super(fsHelperService);

    this.fileName = 'transactions';
    this.data = fsHelperService.readFile<TransactionModel>(this.fileName);
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
