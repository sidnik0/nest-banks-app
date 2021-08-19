import { Injectable } from '@nestjs/common';
import { FsBaseRepository } from './fs-base.repository';
import { AccountRepository } from './interface/account.repository';
import { FsHelperService } from '../common/helper/fs-helper.service';
import { AccountModel } from '../model/account.model';

@Injectable()
export class FsAccountRepository
  extends FsBaseRepository<AccountModel>
  implements AccountRepository
{
  constructor(protected readonly fsHelperService: FsHelperService) {
    super();

    this.fileName = 'accounts';
    this.data = fsHelperService.readFile<AccountModel>(this.fileName);
  }

  async getAllByUserBank(id: string): Promise<Array<AccountModel>> {
    const result: Array<AccountModel> = [];

    for (const obj of Object.values(this.data)) {
      if (obj.userBankId === id) {
        result.push(obj);
      }
    }

    return result;
  }
}
