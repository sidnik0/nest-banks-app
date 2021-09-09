import { Injectable, Logger } from '@nestjs/common';
import { FsBaseRepository } from './fs-base.repository';
import { IUserRepository } from './interface/user.repository';
import { UserModel } from '../model/interface/user.model';

@Injectable()
export class FsUserRepository
  extends FsBaseRepository<UserModel>
  implements IUserRepository
{
  constructor() {
    super();

    this.logger = new Logger('FsUserRepository');
    this.fileName = 'users';
    this.data = this.fileSystem.readFile<UserModel>(this.fileName);
  }

  getLoggingModelId(model: string | UserModel): string {
    if (typeof model === 'string') return model;

    return model.id ? `id=${model.id}` : `name=${model.name}`;
  }
}
