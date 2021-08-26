import { Injectable, Logger } from '@nestjs/common';
import { FsBaseRepository } from './fs-base.repository';
import { IUserRepository } from './interface/user.repository';
import { IFsHelper } from '../common/helper/interface/fs-helper';
import { IIdHelper } from '../common/helper/interface/id-helper';
import { UserModel } from '../model/interface/user.model';

@Injectable()
export class FsUserRepository
  extends FsBaseRepository<UserModel>
  implements IUserRepository
{
  constructor(
    protected readonly fsHelper: IFsHelper,
    protected readonly idHelper: IIdHelper,
  ) {
    super(fsHelper, idHelper);

    this.logger = new Logger('FsUserRepository');
    this.fileName = 'users';
    this.data = fsHelper.readFile<UserModel>(this.fileName);
  }

  getLoggingModelId(model: string | UserModel): string {
    if (typeof model === 'string') return model;

    return model.id ? `id=${model.id}` : `name=${model.name}`;
  }
}
