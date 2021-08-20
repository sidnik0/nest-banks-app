import { Injectable } from '@nestjs/common';
import { FsBaseRepository } from './fs-base.repository';
import { AccountRepository } from './interface/account.repository';
import { FsHelper } from '../common/helper/interface/fs.helper';
import { IdHelper } from '../common/helper/interface/id.helper';
import { AccountModel } from '../model/interface/account.model';

@Injectable()
export class FsAccountRepository
  extends FsBaseRepository<AccountModel>
  implements AccountRepository
{
  constructor(
    protected readonly fsHelper: FsHelper,
    protected readonly idHelper: IdHelper,
  ) {
    super();

    this.fileName = 'accounts';
    this.data = fsHelper.readFile<AccountModel>(this.fileName);
  }

  async getAllByUserBank(id: string): Promise<Array<AccountModel>> {
    if (!id) return null;

    const result: Array<AccountModel> = [];

    for (const obj of Object.values(this.data)) {
      if (obj.userBankId === id) {
        result.push(obj);
      }
    }

    return result;
  }
}
