import { Injectable, Logger } from '@nestjs/common';
import { FsBaseRepository } from './fs-base.repository';
import { UserRepository } from './interface/user.repository';
import { UserModel } from '../model/interface/user.model';
import { FileSystem } from '../common/helper/file-system';
import { IdGenerator } from '../common/helper/id-generator';

@Injectable()
export class FsUserRepository
  extends FsBaseRepository<UserModel>
  implements UserRepository
{
  constructor(
    protected readonly fileSystem: FileSystem,
    protected readonly idGenerator: IdGenerator,
  ) {
    super(fileSystem, idGenerator);

    this.logger = new Logger('FsUserRepository');
    this.fileName = 'users';
    this.data = this.fileSystem.readFile<UserModel>(this.fileName);
  }

  getLoggingModelId(model: string | UserModel): string {
    if (typeof model === 'string') return model;

    return model.id ? `id=${model.id}` : `name=${model.name}`;
  }
}
