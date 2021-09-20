import { Injectable, Logger } from '@nestjs/common';
import { FsBaseRepository } from './fs-base.repository';
import { IAccountRepository } from './interface/account.repository';
import { AccountModel } from '../model/interface/account.model';
import { FileSystemHelper } from '../common/helper/file-system';
import { IdGenerator } from '../common/helper/id-generator';

@Injectable()
export class FsAccountRepository extends FsBaseRepository<AccountModel> implements IAccountRepository {
  constructor(protected readonly fileSystem: FileSystemHelper, protected readonly idGenerator: IdGenerator) {
    super(fileSystem, idGenerator);

    this.logger = new Logger('FsAccountRepository');
    this.fileName = 'accounts';
    this.data = this.fileSystem.readFile<AccountModel>(this.fileName);
  }

  getLoggingModelId(model: AccountModel | string): string {
    if (typeof model === 'string') {
      return model;
    }

    return model.id ? `id=${model.id}` : `userId=${model.userId}, bankId=${model.bankId}`;
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

  async getAllByUserAndBank(userId: string, bankId: string): Promise<AccountModel[]> {
    const result: AccountModel[] = [];

    for (const obj of Object.values(this.data)) {
      if (obj.userId === userId && obj.bankId === bankId) {
        result.push(obj);
      }
    }

    return result;
  }
}
