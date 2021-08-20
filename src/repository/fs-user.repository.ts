import { Injectable } from '@nestjs/common';
import { FsBaseRepository } from './fs-base.repository';
import { UserRepository } from './interface/user.repository';
import { FsHelper } from '../common/helper/interface/fs.helper';
import { IdHelper } from '../common/helper/interface/id.helper';
import { UserModel } from '../model/interface/user.model';

@Injectable()
export class FsUserRepository
  extends FsBaseRepository<UserModel>
  implements UserRepository
{
  constructor(
    protected readonly fsHelper: FsHelper,
    protected readonly idHelper: IdHelper,
  ) {
    super();

    this.fileName = 'users';
    this.data = fsHelper.readFile<UserModel>(this.fileName);
  }
}
