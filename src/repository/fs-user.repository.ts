import { Injectable, Logger } from '@nestjs/common';
import { FsBaseRepository } from './fs-base.repository';
import { IUserRepository } from './interface/user.repository';
import { UserModel } from '../model/interface/user.model';
import { FileSystemHelper } from '../common/helper/file-system';
import { IdGenerator } from '../common/helper/id-generator';
import { FaceType } from '../types/face.type';

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

  async findEntityUserByName(name: string): Promise<UserModel | undefined> {
    let user: UserModel;

    for (const userId of Object.keys(this.data)) {
      if (this.data[userId].name === name && this.data[userId].face === FaceType.ENTITY) {
        user = this.data[userId];

        break;
      }
    }

    return user;
  }
}
