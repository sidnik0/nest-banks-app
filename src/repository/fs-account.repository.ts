import { Injectable, Logger } from '@nestjs/common';
import { FsBaseRepository } from './fs-base.repository';
import { IAccountRepository } from './interface/account.repository';
import { FsHelper } from '../common/helper/interface/fs.helper';
import { IdHelper } from '../common/helper/interface/id.helper';
import { AccountModel } from '../model/interface/account.model';

@Injectable()
export class FsAccountRepository
  extends FsBaseRepository<AccountModel>
  implements IAccountRepository
{
  constructor(
    protected readonly fsHelper: FsHelper,
    protected readonly idHelper: IdHelper,
  ) {
    super(fsHelper, idHelper);

    this.logger = new Logger('FsAccountRepository');
    this.fileName = 'accounts';
    this.data = fsHelper.readFile<AccountModel>(this.fileName);
  }

  async getAllByUser(id: string): Promise<AccountModel[]> {
    const result: AccountModel[] = [];

    for (const obj of Object.values(this.data)) {
      if (obj.userId === id) {
        result.push(obj);
      }
    }

    return result;
  }

  async getAllByBank(id: string): Promise<AccountModel[]> {
    const result: AccountModel[] = [];

    for (const obj of Object.values(this.data)) {
      if (obj.bankId === id) {
        result.push(obj);
      }
    }

    return result;
  }

  async getAllByUserAndBank(
    userId: string,
    bankId: string,
  ): Promise<AccountModel[]> {
    const result: AccountModel[] = [];

    for (const obj of Object.values(this.data)) {
      if (obj.userId === userId && obj.bankId === bankId) {
        result.push(obj);
      }
    }

    return result;
  }
}
