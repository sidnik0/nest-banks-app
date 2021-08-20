import { Injectable } from '@nestjs/common';
import { FsBaseRepository } from './fs-base.repository';
import { UserBankRepository } from './interface/user-bank.repository';
import { FsHelper } from '../common/helper/interface/fs.helper';
import { IdHelper } from '../common/helper/interface/id.helper';
import { UserBankModel } from '../model/interface/user-bank.model';

@Injectable()
export class FsUserBankRepository
  extends FsBaseRepository<UserBankModel>
  implements UserBankRepository
{
  constructor(
    protected readonly fsHelper: FsHelper,
    protected readonly idHelper: IdHelper,
  ) {
    super();

    this.fileName = 'users-banks';
    this.data = fsHelper.readFile<UserBankModel>(this.fileName);
  }

  async update(): Promise<never> {
    throw Error('Prohibited operation');
  }

  async getBanksByUser(id: string): Promise<Array<UserBankModel>> {
    const result: Array<UserBankModel> = [];

    for (const obj of Object.values(this.data)) {
      if (obj.userId === id) {
        result.push(obj);
      }
    }

    return result;
  }

  async getUsersByBank(id: string): Promise<Array<UserBankModel>> {
    const result: Array<UserBankModel> = [];

    for (const obj of Object.values(this.data)) {
      if (obj.bankId === id) {
        result.push(obj);
      }
    }

    return result;
  }
}
