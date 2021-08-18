import { BaseRepository } from './base.repository';
import { UserModel } from '../../model/user.model';

export abstract class UserRepository extends BaseRepository<UserModel> {}
