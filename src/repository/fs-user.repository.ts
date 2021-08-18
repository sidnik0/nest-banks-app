import { Injectable } from '@nestjs/common';
import { FsBaseRepository } from './fs-base.repository';
import { UserRepository } from './interface/user.repository';
import { FsHelperService } from '../common/helper/fs-helper.service';
import { UserModel } from '../model/user.model';

@Injectable()
export class FsUserRepository
  extends FsBaseRepository<UserModel>
  implements UserRepository
{
  constructor(protected readonly fsHelperService: FsHelperService) {
    super(fsHelperService);

    this.fileName = 'users';
    this.data = fsHelperService.readFile<UserModel>(this.fileName);
  }
}
