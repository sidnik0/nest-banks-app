import { Injectable, Logger } from '@nestjs/common';
import { FsBaseRepository } from './fs-base.repository';
import { IUserRepository } from './interface/user.repository';
import { UserModel } from '../model/interface/user.model';
import { FileSystemHelper } from 'src/common/helper/file-system';
import { IdGenerator } from 'src/common/helper/id-generator';

@Injectable()
export class FsUserRepository extends FsBaseRepository<UserModel> implements IUserRepository {
  constructor(protected readonly fileSystem: FileSystemHelper, protected readonly idGenerator: IdGenerator) {
    super(fileSystem, idGenerator);

    this.logger = new Logger('FsUserRepository');
    this.fileName = 'users';
    this.data = this.fileSystem.readFile<UserModel>(this.fileName);
  }

  getLoggingModelId(model: string | UserModel): string {
    if (typeof model === 'string') {
      return model;
    }

    return model.id ? `id=${model.id}` : `name=${model.name}`;
  }

  async checkName(name: string): Promise<boolean> {
    let user = null;

    for (const userId of Object.keys(this.data)) {
      if (this.data[userId].name === name) {
        user = this.data[userId];

        break;
      }
    }

    return !!user;
  }
}
