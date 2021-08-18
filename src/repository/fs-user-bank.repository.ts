import { Injectable } from '@nestjs/common';
import { FsBaseRepository } from './fs-base.repository';
import { UserBankRepository } from './interface/user-bank.repository';
import { FsHelperService } from '../common/helper/fs-helper.service';
import { UserBankModel } from '../model/user-bank.model';

@Injectable()
export class FsUserBankRepository
  extends FsBaseRepository<UserBankModel>
  implements UserBankRepository
{
  constructor(protected readonly fsHelperService: FsHelperService) {
    super(fsHelperService);

    this.fileName = 'users-banks';
    this.data = fsHelperService.readFile<UserBankModel>(this.fileName);
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
