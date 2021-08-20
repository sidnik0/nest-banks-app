import { BaseRepository } from './base.repository';
import { UserModel } from '../../model/interface/user.model';

export abstract class UserRepository extends BaseRepository<UserModel> {}
