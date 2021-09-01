import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { UserRepository } from '../repository/interface/user.repository';
import { UserModel } from '../model/interface/user.model';

@Injectable()
export class UserService extends BaseService<UserModel>{
  constructor(protected readonly repository: UserRepository) {
    super(repository);
  }
}
