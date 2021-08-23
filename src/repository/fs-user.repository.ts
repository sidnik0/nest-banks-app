import { Injectable, Logger } from '@nestjs/common';
import { FsBaseRepository } from './fs-base.repository';
import { IUserRepository } from './interface/user.repository';
import { FsHelper } from '../common/helper/interface/fs.helper';
import { IdHelper } from '../common/helper/interface/id.helper';
import { UserModel } from '../model/interface/user.model';

@Injectable()
export class FsUserRepository
  extends FsBaseRepository<UserModel>
  implements IUserRepository
{
  constructor(
    protected readonly fsHelper: FsHelper,
    protected readonly idHelper: IdHelper,
  ) {
    super(fsHelper, idHelper);

    this.logger = new Logger('FsUserRepository');
    this.fileName = 'users';
    this.data = fsHelper.readFile<UserModel>(this.fileName);
  }
}
