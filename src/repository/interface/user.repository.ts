import { IBaseRepository } from './base.repository';
import { UserModel } from '../../model/interface/user.model';

export abstract class IUserRepository extends IBaseRepository<UserModel> {
  abstract findEntityUserByName(name: string): Promise<UserModel | undefined>;
}
