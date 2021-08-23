import { Injectable, Logger } from '@nestjs/common';
import { FsBaseRepository } from './fs-base.repository';
import { ITransactionRepository } from './interface/transaction.repository';
import { FsHelper } from '../common/helper/interface/fs.helper';
import { IdHelper } from '../common/helper/interface/id.helper';
import { TransactionModel } from '../model/interface/transaction.model';

@Injectable()
export class FsTransactionRepository
  extends FsBaseRepository<TransactionModel>
  implements ITransactionRepository
{
  constructor(
    protected readonly fsHelper: FsHelper,
    protected readonly idHelper: IdHelper,
  ) {
    super(fsHelper, idHelper);

    this.logger = new Logger('FsTransactionRepository');
    this.fileName = 'transactions';
    this.data = fsHelper.readFile<TransactionModel>(this.fileName);
  }

  async update(): Promise<never> {
    throw Error('Prohibited operation');
  }

  async deleteById(): Promise<never> {
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

    // return !period
    //   ? result
    //   : FsTransactionRepository.filterByPeriod(result, period);
  }

  // private static filterByPeriod(
  //   data: TransactionModel[],
  //   period: { from: Date; to: Date },
  // ): TransactionModel[] {
  //   return data.map((transaction) => {
  //     if (
  //       period.from <= transaction.createAt &&
  //       transaction.createAt <= period.to
  //     ) {
  //       return transaction;
  //     }
  //   });
  // }
}
