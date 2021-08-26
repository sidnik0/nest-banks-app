import { Injectable, Logger } from '@nestjs/common';
import { FsBaseRepository } from './fs-base.repository';
import { IAccountRepository } from './interface/account.repository';
import { IFsHelper } from '../common/helper/interface/fs-helper';
import { IIdHelper } from '../common/helper/interface/id-helper';
import { AccountModel } from '../model/interface/account.model';

@Injectable()
export class FsAccountRepository
  extends FsBaseRepository<AccountModel>
  implements IAccountRepository
{
  constructor(
    protected readonly fsHelper: IFsHelper,
    protected readonly idHelper: IIdHelper,
  ) {
    super(fsHelper, idHelper);

    this.logger = new Logger('FsAccountRepository');
    this.fileName = 'accounts';
    this.data = fsHelper.readFile<AccountModel>(this.fileName);
  }

  getLoggingModelId(model: AccountModel | string): string {
    if (typeof model === 'string') return model;

    return model.id
      ? `id=${model.id}`
      : `userId=${model.userId}, bankId=${model.bankId}`;
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
